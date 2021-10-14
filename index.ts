import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import './src/codemirror-lsp.css';
import { LspWsConnection, CodeMirrorAdapter } from './src/index';
import path from 'path'


const normalize = dir => dir.replace(/\\/gm,'/')


const tsEditor = CodeMirror(document.querySelector('.ts'), {
	theme: 'idea',
	lineNumbers: true,
	mode: 'text/typescript',
	value: '',
	gutters: ['CodeMirror-lsp'],
});

//tsEditor.on('lsp/diagnostics',data => console.log(data))



const ts = {
	serverUri: 'ws://localhost:3001/typescript',
	languageId: 'typescript',
	rootUri: `file://${normalize(path.join(__dirname,'example-project'))}`,
	documentUri:  `file://${normalize(path.join(__dirname,'example-project/source.ts'))}`,
	documentText: () => tsEditor.getValue(),
};


const tsConnection = new LspWsConnection(ts).connect(new WebSocket(ts.serverUri));

const tsAdapter = new CodeMirrorAdapter(tsConnection, {
	quickSuggestionsDelay: 75
}, tsEditor);
