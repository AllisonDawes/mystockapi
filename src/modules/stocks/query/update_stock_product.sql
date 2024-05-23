update stocks
set quantity = $1, type = $2, updated_at = NOW()
where id = $3;
