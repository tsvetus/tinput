export default {

    TButton: {
        container: {
            cursor: "pointer",
            userSelect: "none"
        }
    },

    TGroupButton: {

        container: {
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch"
        },

        button: {
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }

    },

    TSelectBox: {
        button: {
            flex: "0"
        }
    },

    TIndicator: {
    },

    TComponent: {

        container: {
            outline: "none",
            userSelect: "none",
            boxSizing: "border-box"
        },

        frame: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "space-between"
        },

        label: {
            cursor: "default"
        },

        edit: {
            flex: "1 0",
            whiteSpace: "nowrap",
            overflow: "hidden"
        },

        icon: {
            flexShrink: "0",
            flexGrow: "0"
        },

        list: {

            container: {
                position: "relative",
                top: "0",
                left: "0",
                display: "flex",
                flexDirection: "column",
                zIndex: "2"
            },

            item: {
                marginTop: "-1px"
            }

        },

    },

    TModal: {

        screen: {
            position: "fixed",
            zIndex: "10",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            overflow: "auto",
            backdrop: "static",
            keyboard: "false"
        },

        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            margin: "auto",
            // top: "50%",
            // transform: "translateY(-50%)",
            zIndex: "11",
            cursor: "default"
        },

        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap"
        },

        close: {
            cursor: "pointer"
        },

        content: {
            flex: "1"
        }

    },

    TForm: {

        footer: {
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
        }

    },

    TListForm: {

        form: {
            content: {
                overflowY: "auto"
            }
        },

        ribbon: {
            content: {
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch"
            }
        },

        pager: {
            container: {
                width: "100%"
            }
        }

    },

    TMemo: {

        container: {
        },

        frame: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            height: "auto"
        },

        edit: {
            whiteSpace: "wrap"
        }

    },

    TGroup: {

        container: {
            display: "flex",
            flexDirection: "column",
            border: "none"
        },

        content: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap"
        },

        label: {
            display: "inline",
            opacity: "1",
            zIndex: "1",
            alignSelf: "flex-start"
        }

    },

    TCheck: {

        frame: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap"
        },

        right: {
            textAlign: "right"
        }

    },

    TListBox: {
    },

    TSearch: {

    },

    TLogin: {

        screen: {
            zIndex: "30"
        },

        container: {
            zIndex: "31"
        },

        component: {
        }

    },

    TPanel: {
    },

    TTop: {

        container: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "default"
        },

        button: {
            cursor: "pointer"
        }

    },

    TSide: {

        container: {
            height: "100%",
            width: "0",
            position: "fixed",
            zIndex: "20",
            top: "0",
            left: "0",
            overflowX: "hidden",
            transition: "0.5s",
            tabIndex: "-1"
        },

        close: {
            display: "block",
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "32px",
            height: "32px",
            transition: "0.3s"
        },

        item: {
            display: "block",
            textDecoration: "none",
            transition: "0.3s",
            cursor: "pointer"
        },

        touch: {
            position: "fixed",
            zIndex: "21",
            top: "0",
            left: "0",
            height: "100vh",
            width: "8px",
            opacity: "0"
        }

    },

    TPager: {

        container: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },

        edit: {
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap"
        },

        label: {
            display: "flex",
            justifyContent: "flex-start"
        },

        page: {
            cursor: "pointer",
            userSelect: "none"
        },

        current: {
            cursor: "pointer",
            userSelect: "none"
        },

        control: {
            cursor: "pointer",
            userSelect: "none"
        },

        ellipsis: {

        }

    },

    TLoad: {
        caption: {
            container: {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -80%)",
                zIndex: "40",
                cursor: "default"
            }
        },
        icon: {
            container: {
                position: "fixed",
                top: "calc(50% - 32px)",
                left: "calc(50% - 32px)",
                zIndex: "40",
                cursor: "default"
            }
        },
        inline: {
            container: {
                position: "relative",
                left: "0",
                top: "0"
            }
        }
    },

    TScroll: {
        container: {
            position: "relative"
        }
    },

    TGrid: {

        title: {
            position: "sticky",
            top: "0",
            zIndex: "1"
        },

        caption: {
            position: "sticky",
            top: "0",
            zIndex: "1"
        },

        noSelect: {
            cursor: "default"
        }

    },

    TTable: {

        title: {
            position: "sticky",
            top: "0",
            zIndex: "1"
        },

        caption: {
            position: "sticky",
            top: "0",
            zIndex: "1"
        },

        noSelect: {
            cursor: "default"
        }

    },

    TRibbon: {

        title: {
            position: "sticky",
            top: "0",
            left: "0",
            right: "0"
        },

        content: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around"
        }

    },

    TMenu: {
        item: {
            display: "block",
            textDecoration: "none",
            cursor: "pointer"
        }
    },

    TText: {

        container: {
        },

        frame: {
        }

    },

    TMail: {

    },

    TMask: {

    },

    TPopup: {
        frame: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "space-between",
            height: "auto"
        }
    },

    TCalendar: {

        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },

        content: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        },

        row: {
            display: "flex"
        },

        day: {
            container: {
                boxSizing: "border-box",
                display: "flex"
            },
            content: {
                boxSizing: "border-box",
                flex: "1 1 100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        },

        date: {
            container: {
                boxSizing: "border-box",
                display: "flex"
            },
            content: {
                boxSizing: "border-box",
                flex: "1 1 100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        },

        navigator: {
            container: {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center"
            },
            left: {
                display: "flex",
                justifyContent: "flex-start"
            },
            center: {
                display: "flex",
                justifyContent: "center"
            },
            right: {
                display: "flex",
                justifyContent: "flex-end"
            },
            button: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
        }

    },

    TDate: {
        calendar: {
            container: {
                position: "relative",
                top: "0",
                left: "0",
                zIndex: "3"
            }
        }
    }

}