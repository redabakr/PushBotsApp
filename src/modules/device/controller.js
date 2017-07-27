import gcm from 'node-gcm';
import Device from './model';
import config from './config';

export const registerDevice = async (req, res) => {
    const { registrationID } = req.body;
    // validate registrationID
    if (!registrationID) {
        return res.status(400).json({ error: true, message: 'registrationID must be provided!' });
    } else if (typeof registrationID !== 'string') {
        return res.status(400).json({ error: true, message: 'registrationID must be a string!' });
    }
    const newDevice = new Device({ registrationID });
    // add device registrationID to the db
    try {
        return res.status(201).json({ Device: await newDevice.save() });
    } catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with Device' });
    }
};


export const pushNotification = async (req, res) => {
    const { registrationID } = req.params;

    // validate device registrationID
    if (!registrationID) {
        return res.status(400).json({ error: true, message: 'registrationID must be provided!' });
    } else if (typeof registrationID !== 'string') {
        return res.status(400).json({ error: true, message: 'registrationID must be a string!' });
    }
    // check if device registrationID exists in the db
    const device = await Device.findOne({ 'registrationID': registrationID });
    if (!device) {
        return res.status(400).json({ error: true, message: 'Device not exist' });
    }
    // send GCM notification
    try {
        // TODO: code to send APN
        const sender = new gcm.Sender(config.API_KEY);
        const message = new gcm.Message({ data: { key1: 'This is a test message' } });
        const regregistrationIDs = [registrationID];
        sender.send(message, { registrationregistrationIDs: regregistrationIDs }, function (err, response) {
        if (err) {
            console.error(err);
            return res.status(e.status).json({ error: true, message: 'Error with sending APN' });
        }
            else{ console.log(response);}
            return res.status(200).json({ message: 'Notification sent.' });
        });

    } catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with sending APN' });
    }
};