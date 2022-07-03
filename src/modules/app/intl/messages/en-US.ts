import config from '../../../../config/app';

const messages = {
  responses: {
    GENERATE_USER_LOGIN_CODE: 'Successful user login code generated',
    CHECK_USER_LOGIN_CODE: 'Successful user login code checked',
    USER_DELETED_WITH_SUCCESS: 'User deleted with success'
  },
  errors: {
    INTERNAL_ERROR_SERVER: 'Internal Error Server',
    INTERNAL_ERROR_SERVER_MESSAGE: 'Something is wrong!',
    SCOPE_NOT_FOUND: 'Scope not found!',
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXISTS: 'User already exists',
    USER_CANNOT_DO_THIS_ACTION: 'User cannot do this action',
  },
  keys: {
    logs: {
      ESSENTIALS: 'app:essentials',
      ERROR: 'app:essentials:error',
    },
  },
  logs: {
    INITIAL_LOG: `🚀️ Server started on port ${config.settings.port}!`,
  },
};

export default messages;
