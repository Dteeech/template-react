import { asyncQuery } from '../../config/database.js';

const updateUserRoleById = async (id, role_id) => {
  const sql = "UPDATE users SET role_id = ? WHERE id = ?";
  const response = await asyncQuery(sql, [role_id, id]);
  return response.affectedRows > 0;
};

export default updateUserRoleById;
