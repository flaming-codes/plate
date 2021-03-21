import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_LI,
  ELEMENT_LINK,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_UL,
} from '@udecode/slate-plugins';
import { getPluginType } from '@udecode/slate-plugins-core';
import markdown from 'remark-parse';
import slate from 'remark-slate';
import { Editor } from 'slate';
import unified from 'unified';

export const parseMD = (editor: Editor, content: string) => {
  const tree: any = unified()
    .use(markdown)
    .use(slate, {
      nodeTypes: {
        paragraph: getPluginType(editor, ELEMENT_PARAGRAPH),
        block_quote: getPluginType(editor, ELEMENT_BLOCKQUOTE),
        link: getPluginType(editor, ELEMENT_LINK),
        code_block: getPluginType(editor, ELEMENT_CODE_BLOCK),
        ul_list: getPluginType(editor, ELEMENT_UL),
        ol_list: getPluginType(editor, ELEMENT_OL),
        listItem: getPluginType(editor, ELEMENT_LI),
        heading: {
          1: getPluginType(editor, ELEMENT_H1),
          2: getPluginType(editor, ELEMENT_H2),
          3: getPluginType(editor, ELEMENT_H3),
          4: getPluginType(editor, ELEMENT_H4),
          5: getPluginType(editor, ELEMENT_H5),
          6: getPluginType(editor, ELEMENT_H6),
        },
      },
      linkDestinationKey: 'url',
    })
    .processSync(content);

  return tree.result;
};