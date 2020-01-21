export default function defaultStyles(template) {

    let button = {
        ...template.fonts.common,
        margin: "4px",
        textAlign: "center"
    };

    return {

        colors: template.colors,
        fonts: template.fonts,

        TIcon: {
            container: {
                width: "32px",
                height: "32px",
                color: template.colors.border
            }
        },

        TButton: {
            container: {
                padding: "8px 16px 8px 16px",
                border: "1px solid " + template.colors.frame,
                backgroundColor: template.colors.face,
                color: template.colors.text,
                borderRadius: "8px",
                textAlign: "center",
                ...template.fonts.common
            },
            wait: {
                color: "#ddd"
            }
        },

        TIndicator: {
            container: {
                color: template.colors.indicator,
                flex: "0 0 24px",
                textAlign: "center",
                fontWeight: "bold",
                ...template.fonts.common
            }
        },

        TComponent: {

            container: {
                width: "100%"
            },

            frame: {},

            label: {
                padding: "4px 8px 0 0",
                border: "none",
                color: template.colors.border,
                outline: "none",
                textAlign: "left",
                ...template.fonts.common
            },

            edit: {
                minHeight: "18px",
                padding: "4px 4px 2px 4px",
                border: "1px solid " + template.colors.frame,
                color: template.colors.text,
                outline: "none",
                textAlign: "left",
                ...template.fonts.common
            },

            icon: {
                width: "21px",
                height: "21px",
                textAlign: "right",
                color: template.colors.border,
                cursor: "pointer"
            },

            list: {

                container: {
                    backgroundColor: template.colors.window
                },

                item: {
                    padding: "8px",
                    border: "1px solid " + template.colors.frame,
                    color: template.colors.text,
                    outline: "none",
                    backgroundColor: template.colors.panel,
                    cursor: "pointer",
                    textAlign: "center",
                    tabindex: "0",
                    ...template.fonts.common
                },

                selected: {
                    fontWeight: "bold"
                },

                hover: {
                    backgroundColor: "#fff",
                    border: "1px solid " + template.colors.border
                }

            },

            invalid: {

                label: {
                    color: "#f43"
                },

                edit: {
                    border: "1px solid red",
                    backgroundColor: "#eea"
                }

            }

        },

        TModal: {

            container: {
                backgroundColor: template.colors.window,
                borderRadius: "16px",
                maxWidth: "600px",
                width: "55%",
                padding: "4px"
            },

            header: {
                margin: "16px 16px 0 16px",
                ...template.fonts.common
            },

            close: {
                color: template.colors.border,
                width: "24px",
                height: "24px",
                ...template.fonts.common
            },

            timer: {
                ...template.fonts.common,
                color: template.colors.signal,
                fontSize: "24px"
            },

            caption: {
                color: template.colors.border,
                textAlign: "center",
                margin: "0 8px 0 8px",
                ...template.fonts.common
            },

            content: {
                color: template.colors.text,
                margin: "16px",
                ...template.fonts.common
            }

        },

        TForm: {

            footer: {
                margin: "24px 16px 8px 16px"
            },

            message: {
                ...template.fonts.common,
                margin: "16px",
                color: "#393",
                textAlign: "center"
            },

            error: {
                ...template.fonts.common,
                margin: "16px",
                color: "#a13b3b",
                textAlign: "center"
            },

            buttons: {

                cancel: {
                    ...button,
                    fontWeight: "bold",
                    color: "#2a2975"
                },

                ok: {
                    ...button,
                    color: "#3f943f"
                },

                submit: {
                    ...button,
                    color: "#3f943f"
                },

                save: {
                    ...button,
                    fontWeight: "bold",
                    color: "#3f943f"
                },

                open: {
                    ...button,
                    fontWeight: "bold",
                    color: "#ff9838"
                },

                edit: {
                    ...button,
                    fontWeight: "bold",
                    color: "#3f943f"
                },

                add: {
                    ...button,
                    fontWeight: "bold",
                    color: "#3f943f"
                },

                wait: {
                    ...button,
                    fontWeight: "bold",
                    color: "#ddd",
                    border: "1px solid #ddd",
                    cursor: "default"
                },

                delete: {
                    ...button,
                    fontWeight: "bold",
                    color: "#a13b3b"
                }

            }

        },

        TMemo: {

            edit: {
                minHeight: "18px",
                border: "1px solid " + template.colors.border
            }

        },

        TGroup: {

            content: {
                padding: "12px",
                border: "1px solid " + template.colors.border
            },

            label: {
                margin: "0 0 -8px 8px",
                padding: "0 4px 0 4px",
                backgroundColor: template.colors.window
            }

        },

        TPanel: {
            backgroundImage: "linear-gradient(" + template.colors.panel + ", " + template.colors.window + ")",
            backgroundColor: template.colors.panel,
            color: template.colors.border,
            ...template.fonts.common
        },

        TTop: {

            container: {
                backgroundColor: template.colors.panel
            },

            button: {
                flexShrink: "0",
                color: template.colors.border,
                height: "32px",
                width: "32px",
                margin: "4px"
            },

            caption: {
                ...template.fonts.common,
                color: template.colors.border,
                fontSize: "24px",
                textAlign: "center"
            },

            tools: {
                margin: "0 8px 0 0"
            },

            icon: {
                margin: "0 0 0 8px",
                color: template.colors.border,
                height: "32px",
                width: "32px"
            },

            clickable: {
                cursor: "pointer"
            }

        },

        TSide: {

            container: {
                backgroundColor: template.colors.panel,
                paddingTop: "60px",
                borderRight: "1px solid " + template.colors.frame
            },

            close: {
                color: template.colors.border
            },

            item: {
                ...template.fonts.common,
                padding: "8px 8px 8px 32px",
                fontSize: "24px",
                color: template.colors.text
            },

            current: {
                fontWeight: "bold",
                marginLeft: "8px"
            }

        },

        TLogin: {

            container: {
                maxWidth: "320px",
                minWidth: "220px"

            },

            form: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "120px"
            }

        },

        TResponse: {

            container: {
                textAlign: "center"
            },

            error: {
                ...template.fonts.common,
                margin: "16px",
                color: template.colors.error
            },

            message: {
                ...template.fonts.common,
                margin: "16px",
                color: template.colors.message
            }

        },

        TDate: {
            container: {
                width: "220px"
            }
        },

        TScroll: {
            container: {
                ...template.fonts.common,
                backgroundColor: template.colors.window,
                width: "100%"
            },
            content: {
            },
            close: {
            }
        },

        TPager: {

            container: {
            },

            edit: {
            },

            label: {
            },

            page: {
                margin: "0 1px 0 1px",
                padding: "1px 6px 0 6px",
                border: "1px solid " + template.colors.frame
            },

            current: {
                margin: "0 1px 0 1px",
                padding: "1px 6px 0 6px",
                border: "1px solid " + template.colors.frame,
                backgroundColor: template.colors.face,
                fontWeight: "bold"
            }

        },

        TLoad: {
            border: "1px solid " + template.colors.frame,
            borderRadius: "16px",
            backgroundColor: template.colors.face,
            color: template.colors.border,
            padding: "16px",
            opacity: "0.8",
            fontSize: "20px",
            fontWeight: "bold"
        },

        TGrid: {

            head: {
                padding: "${width} 0 0 0",
                textAlign: "center",
                fontWeight: "bold",
                color: template.colors.border
            },

            title: {
                backgroundColor: template.colors.window,
                marginTop: "-${width}",
                padding: "0 0 4px 0",
                fontWeight: "normal"
            },

            caption: {
                backgroundColor: template.colors.window,
                border: "${width} solid " + template.colors.frame,
                marginLeft: "-${width}",
                marginTop: "-${width}",
                overflowX: "hidden",
                padding: "4px",
            },

            body: {
                padding: "0 0 16px 0",
            },

            cell: {
                backgroundColor: template.colors.window,
                border: "${width} solid " + template.colors.frame,
                marginLeft: "-${width}",
                marginTop: "-${width}",
                overflowX: "hidden",
                padding: "4px",
                cursor: "pointer"
            },

            selected: {
                backgroundColor: template.colors.panel,
                fontWeight: "bold"
            }

        },

        TRibbon: {

            title: {
                backgroundColor: template.colors.window,
                padding: "0 0 4px 0"
            }

        },

        TMenu: {
            content: {
                paddingTop: "8px"
            },
            item: {
                ...template.fonts.common,
                padding: "8px 8px 8px 32px",
                fontSize: "24px",
                color: template.colors.text
            },
            current: {
                fontWeight: "bold",
                marginLeft: "8px"
            }
        }

    }

}