 SELECT
  p.id,
  p.name_product,
  p.category,
  COALESCE(SUM(CASE WHEN Date(s.created_at) < $2 AND s.type = 'input' THEN s.quantity ELSE 0 END), 0) -
  COALESCE(SUM(CASE WHEN Date(s.created_at) < $2 AND s.type = 'output' THEN s.quantity ELSE 0 END), 0) AS initial_stock,
  COALESCE(SUM(CASE WHEN Date(s.created_at) >= $2 AND DATE(s.created_at) <= $3 AND s.type = 'input' THEN s.quantity ELSE 0 END), 0) AS total_entries,
  COALESCE(SUM(CASE WHEN Date(s.created_at) >= $2 AND DATE(s.created_at) <= $3 AND s.type = 'output' THEN s.quantity ELSE 0 END), 0) AS total_exits,
  COALESCE(SUM(CASE WHEN Date(s.created_at) < $2 AND s.type = 'input' THEN s.quantity ELSE 0 END), 0) -
  COALESCE(SUM(CASE WHEN Date(s.created_at) < $2 AND s.type = 'output' THEN s.quantity ELSE 0 END), 0) +
  COALESCE(SUM(CASE WHEN Date(s.created_at) >= $2 AND DATE(s.created_at) <= $3 AND s.type = 'input' THEN s.quantity ELSE 0 END), 0) -
  COALESCE(SUM(CASE WHEN Date(s.created_at) >= $2 AND DATE(s.created_at) <= $3 AND s.type = 'output' THEN s.quantity ELSE 0 END), 0) AS final_stock
FROM
  products p
LEFT JOIN
  stocks s ON p.id = s.product_id
where
  p.name_product ilike $1
GROUP BY
  p.id, p.name_product, p.category
ORDER BY
  p.name_product;

