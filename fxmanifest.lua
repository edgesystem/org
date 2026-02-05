fx_version 'cerulean'
game 'gta5'
lua54 'yes'
nui_callbacks 'yes'

author 'Your Name'
description 'Organization Management Panel - GTA RP'
version '1.0.0'

shared_scripts {
    '@ox_lib/init.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
    'config.lua'
}

client_scripts {
    'client/main.lua'
}

ui_page 'nui/build/index.html'

files {
    'nui/build/index.html',
    'nui/build/**/*'
}

dependencies {
    'qb-core',
    'oxmysql',
    'ox_lib'
}
