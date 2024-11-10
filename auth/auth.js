import { ManagementClient } from "auth0";
import dotenv from 'dotenv';
dotenv.config();

const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: process.env.AUTH0_SCOPE,
});

async function updateAuth0User(body) {
  //{ user_id, blocked, ...attributes }
  try {
    const { user_id, blocked, ...attributes } = body;
    let updateData;
    if (Object.keys(body).length === 2) {
      updateData = { blocked: blocked };
    } else {
      // Preparamos el objeto de actualización con `app_metadata` y `user_metadata`
      updateData = {
        app_metadata: {},
      };

      // Asigna `role` a `app_metadata`
      if (attributes.role) updateData.app_metadata.role = attributes.role;
      // Actualiza otros campos directos del usuario, como `name`
      if (attributes.name) updateData.app_metadata.name = attributes.name;
      // Puedes agregar más campos según lo necesites
      // if (attributes.email_verified !== undefined) {
      //   updateData.email_verified = attributes.email_verified;
      // }
    }
    // Realiza la actualización del usuario en Auth0
    await auth0.users.update({ id: user_id }, updateData);//const updatedUser = await ...
    console.log("Usuario modificado con exito en Auth0");
  } catch (error) {
    console.error("Error modificando usuario en Auth0:", error);
    throw new Error("No se pudo modificar usuario en Auth0");
  }
}

export default updateAuth0User;