import { Howl, Howler } from 'howler';
import fMp3 from './audio/f.mp3';
// import fsharpMp3 from './audio/fsharp.mp3';
// import gMp3 from './audio/g.mp3';
// import gsharpMp3 from './audio/gsharp.mp3';
// import aMp3 from './audio/a.mp3';
// import asharpMp3 from './audio/asharp.mp3';
// import bMp3 from './audio/b.mp3';
// import cMp3 from './audio/c.mp3';
// import csharpMp3 from './audio/csharp.mp3';
// import dMp3 from './audio/d.mp3';
// import dsharpMp3 from './audio/dsharp.mp3';
// import eMp3 from './audio/e.mp3';

const audioSrc = {
	drum: [
		{
			oggSrc: '',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK01-Kick01.wav',
			srcDescription: 'Kick-1',
			label: 'Q',
			keyCode: 81
		},
		{
			oggSrc: '',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK01-Kick02.wav',
			srcDescription: 'Kick-2',
			label: 'W',
			keyCode: 87
		},
		{
			oggSrc: '',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK01-Snr01.wav',
			srcDescription: 'Snare',
			label: 'E',
			keyCode: 69
		},
		{
			oggSrc: '',
			mp3Src: '',
			wavSrc: './audio/CYCdh_Kurz08-Perc07.wav',
			srcDescription: 'Electric-tap',
			label: 'A',
			keyCode: 65
		},
		{
			oggSrc: '',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK01-Snr02.wav',
			srcDescription: 'Snare-2',
			label: 'S',
			keyCode: 83
		},
		{
			oggSrc: '',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK02-Clap01.wav',
			srcDescription: 'Clap',
			label: 'D',
			keyCode: 68
		},
		{
			oggSrc: '',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom01.wav',
			srcDescription: 'Tom-1',
			label: 'Z',
			keyCode: 90
		},
		{
			oggSrc: '',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom03.wav',
			srcDescription: 'Tom-2',
			label: 'X',
			keyCode: 88
		},
		{
			oggSrc: '',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: 'C',
			keyCode: 67
		}
	],
	piano: [
		{
			src:[
				fMp3
			],
			srcDescription: 'F',
			label: 'G',
			keyCode: 71,
			isWhite: true
		}/*,
		{
			src:[
				// './audio/f.ogg',
				'./audio/fsharp.mp3'
			],
			oggSrc: './audio/fsharp.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: 'Y',
			keyCode: 89,
			isWhite: false
		},
		{
			oggSrc: './audio/g.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: 'H',
			keyCode: 72,
			isWhite: true
		},
		{
			oggSrc: './audio/gsharp.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: 'U',
			keyCode: 85,
			isWhite: false
		},
		{
			oggSrc: './audio/a.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: 'J',
			keyCode: 74,
			isWhite: true
		},
		{
			oggSrc: './audio/asharp.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: 'I',
			keyCode: 73,
			isWhite: false
		},
		{
			oggSrc: './audio/b.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: 'K',
			keyCode: 75,
			isWhite: true
		},
		{
			oggSrc: './audio/c.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: 'L',
			keyCode: 76,
			isWhite: true
		},
		{
			oggSrc: './audio/csharp.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: 'P',
			keyCode: 80,
			isWhite: false
		},
		{
			oggSrc: './audio/d.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: ';',
			keyCode: 186,
			isWhite: true
		},
		{
			oggSrc: './audio/dsharp.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: '[',
			keyCode: 219,
			isWhite: false
		},
		{
			oggSrc: './audio/e.ogg',
			mp3Src: '',
			wavSrc: './audio/CYCdh_ElecK03-Tom05.wav',
			srcDescription: 'Tom-3',
			label: '\'',
			keyCode: 222,
			isWhite: true
		},*/
	]
};

const pianoWithHowl = audioSrc.piano.map(s => {
	return Object.assign(s, {
		howl: new Howl({
			preload: true,
			src: s.src,
			onplay: (id) => s.howl.fade(0.0, 1.0, 40, id)
		})
	});
});

export default pianoWithHowl;