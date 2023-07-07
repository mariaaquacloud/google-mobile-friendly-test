# Google mobile friendly test

This project is a Node.js based application that interfaces with Google APIs for testing whether a page on your site is mobile-friendly.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

* [Node.js](https://nodejs.org/en/download/) and npm

### Installation

* Clone the repository: `git clone https://github.com/mariaaquacloud/google-mobile-friendly-test.git`
* Navigate to the project directory: `cd project`
* Install the dependencies: `npm install`

## Usage

* After installing the dependencies, you can start the application with `npm start`

## Configuration

In order to use the Google APIs, you need to provide your Google API credentials. Follow these steps to configure your application:

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "Credentials" and create a new API Key
4. Copy the generated API Key
5. In the project directory, create a file named `.env` and insert the following line: `GOOGLE_AUTH_TOKEN=your_api_key_here`, replacing `your_api_key_here` with the API Key you copied from the Google Cloud Console

## Authors

* **Alexey Vetkhov** - [avetkhov](https://github.com/avetkhov)

See also the list of [contributors](https://github.com/mariaaquacloud/google-mobile-friendly-test/contributors) who participated in this project.

## License

This project is licensed under the Apache License - see the [LICENSE.md](https://github.com/mariaaquacloud/google-mobile-friendly-test/LICENSE.md) file for details
