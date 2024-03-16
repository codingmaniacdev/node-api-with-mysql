const welcomeController = {
    home: (req, res) => {
        res.send('Welcome to Dashboard')
    },

    hotels: (req, res) => {
        res.send('Welcome to hotels List')
    }
}

module.exports = welcomeController;