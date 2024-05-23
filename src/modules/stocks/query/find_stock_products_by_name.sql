WITH StockSummary AS (
  SELECT
    p.id,
    p.name_product,
    p.category,
    p.price,
    DATE(s.created_at) AS date,
    SUM(CASE WHEN s.type = 'input' THEN s.quantity ELSE 0 END) AS total_entries,
    SUM(CASE WHEN s.type = 'output' THEN s.quantity ELSE 0 END) AS total_exits,
    LAG(SUM(CASE WHEN s.type = 'input' THEN s.quantity ELSE 0 END) -
        SUM(CASE WHEN s.type = 'output' THEN s.quantity ELSE 0 END), 1, 0) OVER (PARTITION BY p.id ORDER BY DATE(s.created_at)) AS previous_stock
  FROM
    stocks s
  JOIN
    products p ON s.product_id = p.id
  where
    p.name_product ILIKE $1 AND
    DATE(s.created_at) BETWEEN $2 AND $3
  GROUP BY
    p.id, p.name_product, p.category, p.price, DATE(s.created_at)
)
SELECT
  id,
  name_product,
  category,
  price,
  date,
  COALESCE(previous_stock, 0) AS initial_stock,
  total_entries AS inputs,
  total_exits AS outputs,
  COALESCE(previous_stock, 0) + total_entries - total_exits AS final_stock
FROM
  StockSummary
ORDER BY
  name_product, date;
