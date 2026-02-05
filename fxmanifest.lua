fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Your Name'
description 'Organization Management Panel - GTA RP'
version '1.0.0'

shared_scripts {
    '@ox_lib/init.lua',
    'config.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua'
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
