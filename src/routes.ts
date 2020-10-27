export default {
  root: () => '/',
  admin: () => '/admin',
  proposals: () => '/proposals',
  votes: () => '/votes',
  activeProjects: () => '/active_projects',
  rewards: () => '/rewards',
  auth: {
    root: () => '/auth',
    logIn: () => '/auth/log_in',
    logInWithNumio: () => '/auth/numio',
    signUp: () => '/auth/sign_up',
  },
  myProjects: {
    root: () => '/my_projects',
    active: () => '/my_projects/active',
    proposals: () => '/my_projects/proposals',
  },
}
