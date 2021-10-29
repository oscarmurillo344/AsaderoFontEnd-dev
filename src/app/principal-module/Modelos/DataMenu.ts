import MenuListBg from "./menu";

export const DataMenu:MenuListBg[] = [
    {
      nombre: "Inicio",
      icon: "home",
      default: true,
      ruta: "ventas/inicio",
      permisos: ["ROLE_ADMIN","ROLE_USER"]
  
    },
    {
      nombre: "Inventario",
      icon: "list_alt",
      default: true,
      ruta: "inventarios/crear",
      permisos: ["ROLE_ADMIN"]
    },
    {
      nombre: "Gastos",
      icon: "pending_actions",
      default: true,
      ruta: "gastos/ingresar",
      permisos: ["ROLE_ADMIN","ROLE_USER"]
    },
    {
      nombre: "Reportes",
      icon: "fact_check",
      default: true,
      ruta: "control/controlventas",
      permisos: ["ROLE_ADMIN"]
    },
    {
        nombre: "Usuario",
        icon: "person_add",
        default: true,
        ruta: "auth/usuarios",
        permisos: ["ROLE_ADMIN"]
    },
    {
        nombre: "Cerrar sesion",
        icon: "exit_to_app",
        default: true,
        ruta: "auth/login",
        permisos: ["ROLE_ADMIN","ROLE_USER"]
    }
  ]