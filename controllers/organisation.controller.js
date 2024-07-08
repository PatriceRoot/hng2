import Organisation from '../Models/organisation.model.js';

export const getAllOrganisations = async (req, res) => {
  const userId = req.user.id;

  try {
    const organisations = await Organisation.findMany({
      where: { users: { some: { id: userId } } },
    });

    res.status(200).json({
      status: 'success',
      message: 'Organisations fetched successfully',
      data: { organisations },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export const getOrganisationById = async (req, res) => {
  const { orgId } = req.params;
  const userId = req.user.id;

  try {
    const organisation = await Organisation.findFirst({
      where: { id: parseInt(orgId, 10), users: { some: { id: userId } } },
    });

    if (!organisation) {
      return res.status(404).json({
        status: 'Not found',
        message: 'Organisation not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisation fetched successfully',
      data: { organisation },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
