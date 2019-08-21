import { Howl } from 'howler';
import kickOne from '../media/audio/CYCdh_ElecK01-Kick01.wav';

const drumPads = [
	{
		label: 'q',
		src: [
			kickOne
		],
		keyCode: 81,
		//themeColor: #hex
	}/*,
	{
		label: 'w',
		src: [
		
		],
		keyCode: 87,
		//themeColor: #hex
	},
	{
		label: 'e',
		src: [
		
		],
		keyCode: 69,
		//themeColor: #hex
	},
	{
		label: 'a',
		src: [
		
		],
		keyCode: 65,
		//themeColor: #hex
	},
	{
		label: 's',
		src: [
		
		],
		keyCode: 83,
		//themeColor: #hex
	},
	{
		label: 'd',
		src: [
		
		],
		keyCode: 68,
		//themeColor: #hex
	},
	{
		label: 'z',
		src: [
		
		],
		keyCode: 90,
		//themeColor: #hex
	},
	{
		label: 'x',
		src: [
		
		],
		keyCode: 88,
		//themeColor: #hex
	},
	{
		label: 'c',
		src: [
		
		],
		keyCode: 67,
		//themeColor: #hex
	}*/
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