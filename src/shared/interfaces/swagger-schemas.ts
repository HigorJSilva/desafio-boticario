export const IApiUnauthorizedResponse = {
  description: 'Unauthorized Error',
  schema: {
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  },
};

export const IApiNotFoundResponse = (message: string) => ({
  schema: {
    example: {
      message: message,
      error: 'Not Found',
      statusCode: 404,
    },
  },
});

export const UserProfileResponse = {
  description: 'Unauthorized Error',
  schema: {
    example: {
      id: 1,
      username: 'boticario',
    },
  },
};

export const UserExamples = {
  description: 'Available Users to login',
  examples: {
    a: {
      summary: 'Boticario request',
      description: 'Login as user Boticario',
      value: {
        username: 'boticario',
        password: 'password',
      },
    },
    b: {
      summary: 'Quem Disse Berenice request',
      description: 'Login as user Quem Disse Berenice',
      value: {
        username: 'berenice',
        password: 'password',
      },
    },
  },
};
