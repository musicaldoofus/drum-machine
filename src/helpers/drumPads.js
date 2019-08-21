import { Howl } from 'howler';
import kickOne from '../media/audio/CYCdh_ElecK01-Kick01.wav';
import kickTwo from '../media/audio/CYCdh_ElecK01-Kick02.wav';
import snareOne from '../media/audio/CYCdh_ElecK01-Snr01.wav';
import snareTwo from '../media/audio/CYCdh_ElecK01-Snr02.wav';
import clap from '../media/audio/CYCdh_ElecK02-Clap01.wav';
import tomOne from '../media/audio/CYCdh_ElecK03-Tom01.wav';
import tomTwo from '../media/audio/CYCdh_ElecK03-Tom03.wav';
import tomThree from '../media/audio/CYCdh_ElecK03-Tom05.wav';
import kurzHit from '../media/audio/CYCdh_Kurz08-Perc07.wav';

const drumPads = [
	{
		label: 'q',
		src: [
			kickOne
		],
		keyCode: 81,
		btnColor: 'blue'
	},
	{
		label: 'w',
		src: [
			kickTwo
		],
		keyCode: 87,
		btnColor: 'blue'
	},
	{
		label: 'e',
		src: [
			snareOne
		],
		keyCode: 69,
		btnColor: 'purple'
	},
	{
		label: 'a',
		src: [
			snareTwo
		],
		keyCode: 65,
		btnColor: 'purple'
	},
	{
		label: 's',
		src: [
			clap
		],
		keyCode: 83,
		btnColor: 'yellow'
	},
	{
		label: 'd',
		src: [
			tomOne
		],
		keyCode: 68,
		btnColor: 'green'
	},
	{
		label: 'z',
		src: [
			tomTwo
		],
		keyCode: 90,
		btnColor: 'green'
	},
	{
		label: 'x',
		src: [
			tomThree
		],
		keyCode: 88,
		btnColor: 'green'
	},
	{
		label: 'c',
		src: [
			kurzHit
		],
		keyCode: 67,
		btnColor: 'yellow'
	}
];

const drumPadsWithHowler = drumPads.map(pad => {
	return Object.assign(pad, {
		howl: new Howl({
			src: pad.src,
			preload: true,
			onplay: (id) => pad.howl.fade(0.0, 1.0, 40, id)
		})
	});
})

export default drumPadsWithHowler;