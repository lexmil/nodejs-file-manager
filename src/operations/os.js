import os from 'node:os';

export function getOsEOL() {
	console.log(os.EOL);
}

export function getOsCups() {
	console.log(os.cpus());
}

export function getOsHomedir() {
	console.log(os.homedir());
}

export function getOsUsername() {
	console.log(os.userInfo().username);
}

export function getOsArchitecture() {
	console.log(os.arch());
}


