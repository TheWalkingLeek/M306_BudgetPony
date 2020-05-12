const SERIALIZED_USER_COLUMNS = ["id", "email", "salaryday"];
const SERIALIZED_CATEGORY_COLUMNS = ["id", "name", "budget", "userid"];
const SERIALIZED_TRANSACTION_COLUMNS = [
  "id",
  "description",
  "amount",
  "categoryid",
  "createdat"
];

const SERIALIZED_COLUMNS = {
  user: SERIALIZED_USER_COLUMNS,
  category: SERIALIZED_CATEGORY_COLUMNS,
  transaction: SERIALIZED_TRANSACTION_COLUMNS
};

export function serializeSqlResult(model, sqlResult) {
  return serializeSqlRow(model, sqlResult.rows[0]);
}

export function serializeSqlResults(model, sqlResult) {
  let serializedRows = sqlResult.rows.map(row => serializeSqlRow(model, row));
  let json = {};
  json[model] = serializedRows;
  return json;
}

function serializeSqlRow(model, row) {
  let res = {};
  SERIALIZED_COLUMNS[model].forEach(col => {
    res[col] = row[col];
  });
  return res;
}

export { serializeSqlRow };
