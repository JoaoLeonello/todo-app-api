// tests/controllers/UserController.test.js

const UserController = require('../controllers/UserController')

describe('UserController', () => {
  let userController;
  let mockUserService;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockUserService = {
      createUser: jest.fn(),
    };

    userController = new UserController(mockUserService);

    mockRequest = {
      body: {
        name: 'Joao',
        email: 'email@email.com',
        password: 'password123',
      },
    };

    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
  });

  it('should create a new user and return status 201 with user data', async () => {
    const mockUser = {
      toJSON: jest.fn().mockReturnValue({
        id: 1,
        name: 'Joao',
        email: 'email@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };
    mockUserService.createUser.mockResolvedValue(mockUser);

    await userController.register(mockRequest, mockResponse);

    expect(mockUserService.createUser).toHaveBeenCalledWith({
      name: 'Joao',
      email: 'email@email.com',
      password: 'password123',
    });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: mockUser.toJSON() });
  });

  it('should return status 400 with error message when an error occurs', async () => {
    const error = new Error('User already exists');
    mockUserService.createUser.mockRejectedValue(error);

    await userController.register(mockRequest, mockResponse);

    expect(mockUserService.createUser).toHaveBeenCalledWith({
      name: 'Joao',
      email: 'email@email.com',
      password: 'password123',
    });
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
  });
});
