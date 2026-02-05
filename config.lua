-- =====================================================
-- ORGANIZATION MANAGEMENT PANEL - CONFIG
-- =====================================================

Config = {}

Config.Debug = false

-- Organizações: job/gang name => configuração (grades de boss, banco, recrutador)
Config.Organizations = {
    ['bellagio'] = {
        label = 'Bellagio',
        type = 'gang',
        bossgrades = { 4, 5 },
        bankAuthGrades = { 3, 4, 5 },
        recruiterGrades = { 2, 3, 4, 5 },
    },
    ['police'] = {
        label = 'Policia Militar - RJ',
        type = 'job',
        bossgrades = { 4, 5 },
        bankAuthGrades = { 2, 3, 4, 5 },
        recruiterGrades = { 2, 3, 4, 5 },
    },
    ['vanilla'] = {
        label = 'Vanilla',
        type = 'gang',
        bossgrades = { 4, 5 },
        bankAuthGrades = { 3, 4, 5 },
        recruiterGrades = { 2, 3, 4, 5 },
    },
}
