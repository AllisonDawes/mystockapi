SELECT id, quantity, type, product_id
FROM stocks
WHERE id = $1;
