UPDATE products
SET name_product = $1, category = $2, price = $3, updated_at = NOW()
WHERE id = $4;
