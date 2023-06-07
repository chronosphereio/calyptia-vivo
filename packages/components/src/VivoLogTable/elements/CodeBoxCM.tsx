import { json } from '@codemirror/lang-json';
import { StreamLanguage } from '@codemirror/language';
import { lua } from '@codemirror/legacy-modes/mode/lua';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import type { LintSource } from '@codemirror/lint';
import { linter } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { useState } from 'react';
import type { CSSProperties } from 'react';

import { CALYPTIA_CODEBOX_THEME } from '../constants';

// TODO: Ideally we would expose a custom "height" property specified in lines, which we
// might be able to calculate based on other styles such as fontSize
export interface CodeBoxCMProps
  extends Pick<ReactCodeMirrorProps, 'value' | 'height' | 'onChange' | 'readOnly' | 'basicSetup' | 'onCreateEditor'>,
    Partial<{
      language: 'json' | 'lua' | 'shell';
      fontSize: CSSProperties['fontSize'];
    }> {
  lintSource?: LintSource;
}

export function CodeBoxCM(props: CodeBoxCMProps) {
  // separate our custom props from react-codemirror props
  const { language, lintSource, ...cmProps } = props;

  // Saving these codemirror extensions as component state, since it is
  // unlikely we want to create new instances every time "language" changes in
  // the lifetime of the component. I'm assuming that each extension has its
  // own state though, this might be the wrong usage which we need to confirm later.
  const [languageExtension] = useState({
    json: json(),
    lua: StreamLanguage.define(lua),
    shell: StreamLanguage.define(shell),
  });

  const extensions = [CALYPTIA_CODEBOX_THEME, EditorView.lineWrapping];

  if (language) {
    extensions.push(languageExtension[language]);
  }

  if (lintSource) {
    extensions.push(linter(lintSource));
  }

  return (
    <CodeMirror
      extensions={extensions}
      // passthrough codemirror props
      {...cmProps}
    />
  );
}
