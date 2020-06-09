module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-leading-blank': [1, 'always'], // 主体以空白行开头 警告
        'footer-leading-blank': [1, 'always'], // 尾部以空白行开头 警告
        'header-max-length': [2, 'always', 72], // 头部 最大输入 72 , 否则报错
        'header-min-length': [2, 'always', 5], // 头部最低要有5个字
        'scope-case': [2, 'always', 'lower-case'],
        'subject-case': [
            2,
            'never',
            ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
        ],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'build',
                'chore',
                'ci',
                'docs',
                'feat',
                'fix',
                'improvement',
                'perf',
                'refactor',
                'revert',
                'style',
                'test'
            ]
        ]
    }
}
