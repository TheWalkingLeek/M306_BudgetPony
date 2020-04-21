const SERIALIZED_USER_COLUMNS = ['email'];

const SERIALIZED_COLUMNS = {
  user: SERIALIZED_USER_COLUMNS,
};

export default function serializeSqlResult(model, sqlResult) {
  if (sqlResult.rowCount === 1)
    return serializeSqlRow(model, sqlResult.rows[0]);

  let serializedRows = sqlResult.rows.map(row => serializeSqlRow(model, row));
  return {
    model: serializedRows,
  };
}

function serializeSqlRow(model, row) {
  let res = {};
  console.log(SERIALIZED_COLUMNS);
  SERIALIZED_COLUMNS[model].forEach(col => {
    res[col] = row[col];
  });
  return res;
}

export { serializeSqlRow };
