const OrganizationService = require('../../services/OrganizationService');
const Organization = require('../../domain/Organization');

describe('OrganizationService', () => {
  let organizationRepositoryMock;
  let organizationService;

  beforeEach(() => {
    // Mock the organizationRepository
    organizationRepositoryMock = {
      findByName: jest.fn(),
      create: jest.fn(),
    };

    // Instantiate the service with the mocked repository
    organizationService = new OrganizationService(organizationRepositoryMock);
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
});
