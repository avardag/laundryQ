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

exports.getOneById = async function (id) {
  const [laundryToDelete] = await db
    .select(selectableProps)
    .from(tableName)
    .where({ id })
    .timeout(timeout);
  return laundryToDelete;
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

exports.destroy = async function (id) {
  return await db.del().from(tableName).where({ id }).timeout(timeout);
};

/**
 *
 * @param {number} id
 * @param {{key:value}} props
 * @returns
 */
exports.update = async function (id, props) {
  const [updatedLaundry] = await db
    .update(props)
    .from(tableName)
    .where({ id })
    .returning(selectableProps)
    .timeout(timeout);
  return updatedLaundry;
};
