import Device from './model';

export const registerDevice = async (req, res) => {
  const { token } = req.body;
  const newDevice = new Device({ token });

  try {
    return res.status(201).json({ Device: await newDevice.save() });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with Device' });
  }
};
