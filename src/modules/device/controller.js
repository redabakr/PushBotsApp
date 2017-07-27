import gcm from 'node-gcm';
import Device from './model';
import config from './config';

export const registerDevice = async (req, res) => {
    const { token } = req.body;
    // validate token
    if (!token) {
        return res.status(400).json({ error: true, message: 'Token must be provided!' });
    } else if (typeof token !== 'string') {
        return res.status(400).json({ error: true, message: 'Token must be a string!' });
    }
    const newDevice = new Device({ token });
    // add device token to the db
    try {
        return res.status(201).json({ Device: await newDevice.save() });
    } catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with Device' });
    }
};


export const pushNotification = async (req, res) => {
    const { token } = req.params;

    // validate device token
    if (!token) {
        return res.status(400).json({ error: true, message: 'Token must be provided!' });
    } else if (typeof token !== 'string') {
        return res.status(400).json({ error: true, message: 'Token must be a string!' });
    }
    // check if device token exists in the db
    const device = await Device.findOne({ 'token': token });
    if (!device) {
        return res.status(400).json({ error: true, message: 'Device not exist' });
    }
    // send GCM notification
    try {
        // TODO: code to send APN
        const sender = new gcm.Sender(config.API_KEY);
        const message = new gcm.Message({ data: { key1: 'This is a test message' } });
        const regTokens = [token];
        sender.send(message, { registrationTokens: regTokens }, function (err, response) {
            if (err) console.error(err);
            else console.log(response);
        });

    } catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with sending APN' });
    }
};