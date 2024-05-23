select
s.id,
p.name_product,
p.category,
p.price,
s.quantity,
s.type,
s.product_id,
s.created_at,
s.updated_at
FROM stocks s
JOIN products p ON s.product_id = p.id
WHERE p.id = $1;
