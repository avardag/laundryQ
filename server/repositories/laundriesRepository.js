const db = require("../db/db");

const tableName = "laundries";

const selectableProps = [
  "id",
  "name",
  "address",
  "phone",
  "city",
  "postcode",
  "admin_id",
  "is_active",
];

const timeout = 1000;

exports.findAll = async function () {
  return await db.select(selectableProps).from(tableName).timeout(timeout);
};

/**
 *
 * @param {{name:string, address:string, phone:string, city:string, postcode:string, admin_id:number}} props
 * @returns
 */
exports.create = async function (props) {
  const [newLaundry] = await db
    .insert(props)
    .returning(selectableProps)
    .into(tableName)
    .timeout(timeout);
  return newLaundry;
};
