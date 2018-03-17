'use strict';

var parserOpts = {
  headerPattern: /^(\w*)(?:\((.*)\))?\: (.*)$/,
  headerCorrespondence: ['type', 'scope', 'subject'],
  noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
  revertPattern: /^revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./,
  revertCorrespondence: ['header', 'hash']
};

var writerOpts = {
  transform: function transform(commit) {
    return commit;
  },
  groupBy: 'type',
  commitGroupsSort: 'title',
  commitsSort: ['scope', 'subject'],
  noteGroupsSort: 'title',
  headerPartial: '{{version}} - {{date}}',
  mainTemplate: '{{> header}}\n\n{{#each commitGroups}}\n{{#each commits}}\n{{> commit root=@root}}\n{{/each}}\n{{/each}}\n\n{{> footer}}\n',
  commitPartial: ' * {{header}}\n\n{{~!-- commit link --}} {{#if @root.linkReferences~}}\n  {{~#if @root.repository}}\n    {{~#if @root.host}}\n      {{~@root.host}}/\n    {{~/if}}\n    {{~#if @root.owner}}\n      {{~@root.owner}}/\n    {{~/if}}\n    {{~@root.repository}}\n  {{~else}}\n    {{~@root.repoUrl}}\n  {{~/if}}/\n  {{~@root.commit}}/{{hash}}\n{{~else}}\n  {{~hash}}\n{{~/if}}\n\n{{~!-- commit references --}}\n{{~#if references~}}\n  , closes\n  {{~#each references}} {{#if @root.linkReferences~}}\n    {{~#if @root.repository}}\n      {{~#if @root.host}}\n        {{~@root.host}}/\n      {{~/if}}\n      {{~#if this.repository}}\n        {{~#if this.owner}}\n          {{~this.owner}}/\n        {{~/if}}\n        {{~this.repository}}\n      {{~else}}\n        {{~#if @root.owner}}\n          {{~@root.owner}}/\n        {{~/if}}\n          {{~@root.repository}}\n        {{~/if}}\n    {{~else}}\n      {{~@root.repoUrl}}\n    {{~/if}}/\n    {{~@root.issue}}/{{this.issue}}\n  {{~else}}\n    {{~#if this.owner}}\n      {{~this.owner}}/\n    {{~/if}}\n    {{~this.repository}}#{{this.issue}}\n  {{~/if}}{{/each}}\n{{~/if}}\n\n'
};

/*
  writerOpts.mainTemplate = template;
  writerOpts.headerPartial = header;
  writerOpts.commitPartial = commit;
  writerOpts.footerPartial = footer;
*/

module.exports = {
  parserOpts: parserOpts,
  writerOpts: writerOpts
};