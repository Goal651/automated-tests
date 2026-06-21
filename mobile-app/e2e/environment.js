const { DetoxCircusEnvironment } = require('detox/runners/jest');

class CustomDetoxEnvironment extends DetoxCircusEnvironment {
    constructor(config, context) {
        super(config, context);

        // Explicitly extend the initialization timeout for slow emulators
        this.initTimeout = 300000;
    }
}

module.exports = CustomDetoxEnvironment;