import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("./main/routes/_index.ts"),
  
  route("api/auth/google", "./main/routes/api.authGoogle.ts"),
  route("api/auth/google/callback", "./main/routes/api.authGoogleCallback.ts"),
  route("api/logout-user", "./main/routes/api.logoutUser.ts"),
  route("api/validate-user/:token", "./main/routes/api.validateUser.ts"),
  route("api/file-upload", "./main/routes/api.fileUpload.ts"),
  
  layout("./main/routes/layout.signLayout.tsx", [ 
    route("sign-in", "./main/routes/route.signIn.tsx"),
    route("sign-up", "./main/routes/route.signUp.tsx"),
    route("sign-up-google", "./main/routes/route.signUpGoogle.tsx"),
    route("verify-email/:userEmail", "./main/routes/route.verifyEmail.tsx"),
    route("forgot-password", "./main/routes/route.forgotPassword.tsx"),
    route("forgot-password/:forgotPasswordToken", "./main/routes/route.changeForgotPassword.tsx"),
    route("choose-workspace", "./main/routes/route.chooseWorkspace.tsx"),
  ]),
  
  layout("./main/routes/layout.pendingInvitesLayout.tsx", [ 
    route("pending-invites/:token", "./main/routes/route.pendingInvites.tsx"),
  ]),

  route("workspaces/:workspaceId", "./main/routes/layout.workspaceLayout.tsx", [
    route("home", "./main/routes/route.workspace.home.tsx"),
    route("collaborators", "./main/routes/route.collaborators.tsx", [
      index("./main/routes/activeCollaborators.tsx"),
      route("pending", "./main/routes/pendingCollaborators.tsx"),
    ]),
    route("patients", "./main/routes/route.patients.tsx"),
    route("patients/create", "./main/routes/route.patientCreate.tsx"),
    route("patients/:patientId", "./main/routes/route.patientUpdate.tsx"),
  ]),
  
  layout("./main/routes/layout.appLayout.tsx", [
    route("test", "./main/routes/route.test.tsx"),
  ]),

  route("treatment/:treatmentId", "./main/routes/layout.treatmentLayout.tsx", [
    route("home", "./main/routes/route.treatment.home.tsx"),
    route("medications", "./main/routes/route.medications.tsx"),
    route("health-trackers", "./main/routes/route.healthTrackers.tsx"),
  ]),
] satisfies RouteConfig;