export default [
  { app: 'ui', service: 'user', method: 'list', name: '用户列表', description: '查看所有用户', permissions: [{ service: 'user-api', method: 'Users.List' }] },
  { app: 'ui', service: 'user', method: 'add', name: '添加用户', description: '后台添加用户', permissions: [{ service: 'user-api', method: 'Users.Exist' }, { service: 'user-api', method: 'Users.Create' }] },
  { app: 'ui', service: 'user', method: 'update', name: '更新用户', description: '后台更新用户', permissions: [{ service: 'user-api', method: 'Users.Exist' }, { service: 'user-api', method: 'Users.Get' }, { service: 'user-api', method: 'Users.Update' }] },
  { app: 'ui', service: 'user', method: 'delete', name: '删除用户', description: '后台删除用户', permissions: [{ service: 'user-api', method: 'Users.Delete' }] },
  { app: 'ui', service: 'user', method: 'roles', name: '用户角色', description: '管理用户角色', permissions: [{ service: 'user-api', method: 'Roles.All' }, { service: 'user-api', method: 'Casbin.GetRoles' }, { service: 'user-api', method: 'Casbin.UpdateRoles' }] },

  { app: 'ui', service: 'role', method: 'list', name: '角色列表', description: '查看所有角色', permissions: [{ service: 'user-api', method: 'Roles.List' }] },
  { app: 'ui', service: 'role', method: 'add', name: '角色列表', description: '后台添加角色', permissions: [{ service: 'user-api', method: 'Roles.Create' }] },
  { app: 'ui', service: 'role', method: 'update', name: '更新角色', description: '后台更新角色', permissions: [{ service: 'user-api', method: 'Roles.Get' }, { service: 'user-api', method: 'Roles.Create' }] },
  { app: 'ui', service: 'role', method: 'delete', name: '删除角色', description: '后台删除角色', permissions: [{ service: 'user-api', method: 'Roles.Delete' }] },
  { app: 'ui', service: 'role', method: 'permission', name: '角色权限', description: '管理角色权限', permissions: [{ service: 'user-api', method: 'Permissions.All' }, { service: 'user-api', method: 'Casbin.GetPermissions' }, { service: 'user-api', method: 'Casbin.UpdatePermissions' }] }
]
