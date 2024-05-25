
 SELECT
  COALESCE(SUM(CASE WHEN s.type = 'input' THEN s.quantity ELSE 0 END), 0) -
  COALESCE(SUM(CASE WHEN s.type = 'output' THEN s.quantity ELSE 0 END), 0) AS total_stock
FROM
  products p
LEFT JOIN
  stocks s ON p.id = s.product_id
where
  p.id = $1
GROUP BY
  p.id, p.name_product, p.category
ORDER BY
  p.name_product;

