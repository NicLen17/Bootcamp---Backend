const configHeaderWhatsApp = {
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.META_TOKEN}`
    }
}

module.exports = {configHeaderWhatsApp}