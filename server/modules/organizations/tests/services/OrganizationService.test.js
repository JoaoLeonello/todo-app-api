const OrganizationService = require('../../services/OrganizationService');
const Organization = require('../../domain/Organization');

describe('OrganizationService', () => {
  let organizationRepositoryMock;
  let userRepositoryMock;
  let organizationService;

  beforeEach(() => {
    // Mock the organizationRepository and userRepository
    organizationRepositoryMock = {
      findByName: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      addUser: jest.fn(),
    };
    userRepositoryMock = {
      findById: jest.fn(),
    };

    // Instantiate the service with the mocked repositories
    organizationService = new OrganizationService(
      organizationRepositoryMock,
      userRepositoryMock
    );
  });

  describe('createOrganization', () => {
    it('should throw an error if the organization name already exists', async () => {
      // Arrange
      const existingName = 'Existing Org';
      organizationRepositoryMock.findByName.mockResolvedValue(new Organization({ id: 1, name: existingName }));

      // Act & Assert
      await expect(organizationService.createOrganization({ name: existingName }))
        .rejects
        .toThrow('Organization name already exists.');

      expect(organizationRepositoryMock.findByName).toHaveBeenCalledWith(existingName);
    });

    it('should create a new organization if the name does not exist', async () => {
      // Arrange
      const newOrgName = 'New Org';
      const createdOrg = { id: 1, name: newOrgName, createdAt: new Date(), updatedAt: new Date() };

      organizationRepositoryMock.findByName.mockResolvedValue(null);
      organizationRepositoryMock.create.mockResolvedValue(createdOrg);

      // Act
      const result = await organizationService.createOrganization({ name: newOrgName });

      // Assert
      expect(result).toBeInstanceOf(Organization);
      expect(result.name).toBe(newOrgName);
      expect(organizationRepositoryMock.findByName).toHaveBeenCalledWith(newOrgName);
      expect(organizationRepositoryMock.create).toHaveBeenCalledWith({ name: newOrgName });
    });

    it('should throw an error if creating the organization fails', async () => {
      // Arrange
      const newOrgName = 'Failing Org';
      const error = new Error('Database error');
      
      organizationRepositoryMock.findByName.mockResolvedValue(null);
      organizationRepositoryMock.create.mockRejectedValue(error);

      // Act & Assert
      await expect(organizationService.createOrganization({ name: newOrgName }))
        .rejects
        .toThrow('Database error');

      expect(organizationRepositoryMock.findByName).toHaveBeenCalledWith(newOrgName);
      expect(organizationRepositoryMock.create).toHaveBeenCalledWith({ name: newOrgName });
    });
  });

  describe('addUserToOrganization', () => {
    it('should throw an error if the user does not exist', async () => {
      // Arrange
      const user_id = 1;
      const org_id = 1;
      const role = 'admin';

      userRepositoryMock.findById.mockResolvedValue(null); // User does not exist

      // Act & Assert
      await expect(
        organizationService.addUserToOrganization({ user_id, org_id, role })
      ).rejects.toThrow(`User with ID ${user_id} does not exist.`);

      expect(userRepositoryMock.findById).toHaveBeenCalledWith(user_id);
      expect(organizationRepositoryMock.findById).not.toHaveBeenCalled();
    });

    it('should throw an error if the organization does not exist', async () => {
      // Arrange
      const user_id = 1;
      const org_id = 1;
      const role = 'admin';

      userRepositoryMock.findById.mockResolvedValue({ id: user_id });
      organizationRepositoryMock.findById.mockResolvedValue(null); // Organization does not exist

      // Act & Assert
      await expect(
        organizationService.addUserToOrganization({ user_id, org_id, role })
      ).rejects.toThrow(`Organization with ID ${org_id} does not exist.`);

      expect(userRepositoryMock.findById).toHaveBeenCalledWith(user_id);
      expect(organizationRepositoryMock.findById).toHaveBeenCalledWith(org_id);
    });

    it('should throw an error if the role is invalid', async () => {
      // Arrange
      const user_id = 1;
      const org_id = 1;
      const role = 'invalidRole';

      userRepositoryMock.findById.mockResolvedValue({ id: user_id });
      organizationRepositoryMock.findById.mockResolvedValue({ id: org_id });

      // Act & Assert
      await expect(
        organizationService.addUserToOrganization({ user_id, org_id, role })
      ).rejects.toThrow(
        `Invalid role: ${role}. Role must be one of: admin, member`
      );

      expect(userRepositoryMock.findById).toHaveBeenCalledWith(user_id);
      expect(organizationRepositoryMock.findById).toHaveBeenCalledWith(org_id);
    });

    it('should add a user to the organization if all validations pass', async () => {
      // Arrange
      const user_id = 1;
      const org_id = 1;
      const role = 'admin';
      const addUserResult = {
        user_id,
        organization_id: org_id,
        role,
        created_at: new Date(),
        updated_at: new Date(),
      };

      userRepositoryMock.findById.mockResolvedValue({ id: user_id });
      organizationRepositoryMock.findById.mockResolvedValue({ id: org_id });
      organizationRepositoryMock.addUser.mockResolvedValue(addUserResult);

      // Act
      const result = await organizationService.addUserToOrganization({
        user_id,
        org_id,
        role,
      });

      // Assert
      expect(result).toEqual(addUserResult);
      expect(userRepositoryMock.findById).toHaveBeenCalledWith(user_id);
      expect(organizationRepositoryMock.findById).toHaveBeenCalledWith(org_id);
      expect(organizationRepositoryMock.addUser).toHaveBeenCalledWith({
        user_id,
        organization_id: org_id,
        role,
      });
    });

    it('should throw an error if adding the user to the organization fails', async () => {
      // Arrange
      const user_id = 1;
      const org_id = 1;
      const role = 'admin';
      const error = new Error('Database error');

      userRepositoryMock.findById.mockResolvedValue({ id: user_id });
      organizationRepositoryMock.findById.mockResolvedValue({ id: org_id });
      organizationRepositoryMock.addUser.mockRejectedValue(error);

      // Act & Assert
      await expect(
        organizationService.addUserToOrganization({ user_id, org_id, role })
      ).rejects.toThrow('Database error');

      expect(userRepositoryMock.findById).toHaveBeenCalledWith(user_id);
      expect(organizationRepositoryMock.findById).toHaveBeenCalledWith(org_id);
      expect(organizationRepositoryMock.addUser).toHaveBeenCalledWith({
        user_id,
        organization_id: org_id,
        role,
      });
    });
  });
});
