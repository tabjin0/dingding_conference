Page({
    data: {},
    onLoad() { },

    toAddAgenda() {
        dd.navigateTo({
            url: '/page/issueDeclaration/addAgenda/addAgenda',
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            },
        });
    },

    toAgendaList() {
        dd.navigateTo({
            url: '/page/issueDeclaration/agendaList/agendaList',
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            },
        });
    }
});
