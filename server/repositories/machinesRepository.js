const db = require("../db/db");

const tableName = "machines";

const selectableProps = ["id", "laundry_id", "size", "number"];

const timeout = 1000;

/**
 *
 * @param {number} laundry_id
 * @returns Array of machines
 */
exports.findAllByLaundryId = async function (laundry_id) {
  return await db
    .select(selectableProps)
    .from(tableName)
    .where({ laundry_id })
    .timeout(timeout);
};

exports.getOneById = async function (id) {
  const [machineToDelete] = await db
    .select(selectableProps)
    .from(tableName)
    .where({ id })
    .timeout(timeout);
  return machineToDelete;
};

exports.destroy = async function (id) {
  return await db.del().from(tableName).where({ id }).timeout(timeout);
};

/**
 *
 * @param {{laundry_id:number, size:number, number:number}} props
 * @returns newly created machine object
 */
exports.create = async function (props) {
  const [newMachine] = await db
    .insert(props)
    .returning(selectableProps)
    .into(tableName)
    .timeout(timeout);
  return newMachine;
};
