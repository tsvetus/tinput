export default function defaultStyles(template) {

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
                backgroundColor: template.colors.face,
                color: template.colors.text,
                borderRadius: "8px",
                textAlign: "center",
                borderLeft: "1px solid " + template.colors.frame,
                borderTop: "1px solid " + template.colors.frame,
                borderBottom: "1px solid " + template.colors.frame,
                borderRight: "1px solid " + template.colors.frame,
                ...template.fonts.common
            },
            wait: {
                color: "#ddd"
            },
            down: {
                backgroundColor: template.colors.shadow,
                borderLeft: "1px solid " + template.colors.border,
                borderTop: "1px solid " + template.colors.border,
                borderBottom: "1px solid " + template.colors.window,
                borderRight: "1px solid " + template.colors.window
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

        TCheck: {
            right: {
                padding: "4px 0 0 8px"
            }
        },

        TModal: {

            screen: {
                backgroundColor: "rgba(0,0,0,0.4)",
                transitionProperty: "background-color",
                transitionDuration: "${transition}ms"
            },

            screenHidden: {
                backgroundColor: "rgba(0,0,0,0)"
            },

            container: {
                opacity: "1",
                transitionProperty: "opacity",
                transitionDuration: "${transition}ms",
                backgroundColor: template.colors.window,
                borderRadius: "16px",
                maxWidth: "600px",
                width: "55%",
                padding: "4px"
            },

            containerHidden: {
                opacity: "0"
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
                fontSize: "24px",
                width: "48px"
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
            },

            hidden: {

                screen: {
                    backgroundColor: "rgba(0,0,0,0)"
                },

                container: {
                    opacity: "0"
                }

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

            button: {
                ...template.fonts.common,
                margin: "4px",
                textAlign: "center"
            },

            buttons: {

                cancel: {
                    fontWeight: "bold",
                    color: "#2a2975"
                },

                ok: {
                    color: "#3f943f"
                },

                submit: {
                    color: "#3f943f"
                },

                save: {
                    fontWeight: "bold",
                    color: "#3f943f"
                },

                open: {
                    fontWeight: "bold",
                    color: "#ff9838"
                },

                edit: {
                    fontWeight: "bold",
                    color: "#3f943f"
                },

                add: {
                    fontWeight: "bold",
                    color: "#3f943f"
                },

                wait: {
                    fontWeight: "bold",
                    color: "#ddd",
                    border: "1px solid #ddd",
                    cursor: "default"
                },

                delete: {
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

        TButtonGroup: {

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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 0 2px 2px",
                padding: "0 6px 0 5px",
                border: "1px solid " + template.colors.frame
            },

            current: {
                backgroundColor: template.colors.face,
                fontWeight: "bold"
            },

            wait: {
                backgroundColor: template.colors.window,
                color: "#ddd"
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

            container: {
            },

            body: {
                // Deprecated!
            },

            title: {
                backgroundColor: template.colors.window,
                padding: "0 0 4px 0",
                fontWeight: "normal"
            },

            caption: {
                backgroundColor: template.colors.window,
                border: "${width}px solid " + template.colors.frame,
                marginLeft: "-${width}px",
                marginTop: "-${width}px",
                padding: "4px",
                textAlign: "center",
                fontWeight: "bold",
                color: template.colors.border
            },

            head: {
                // Deprecated!
            },

            cell: {
                backgroundColor: template.colors.window,
                border: "${width}px solid " + template.colors.frame,
                marginLeft: "-${width}px",
                marginTop: "-${width}px",
                padding: "4px",
                cursor: "pointer"
            },

            row: {
                // Deprecated!
            },

            selected: {
                backgroundColor: template.colors.panel,
                fontWeight: "bold"
            }

        },

        TTable: {

            container: {
                position: "relative",
                borderCollapse: "collapse",
                width: "100%"
            },

            body: {
            },

            title: {
                position: "sticky",
                backgroundColor: template.colors.window,
                padding: "0 0 4px 0",
                fontWeight: "normal",
                textAlign: "center",
                boxShadow: "-${width}px 0 " + template.colors.window + ", ${width}px 0 " + template.colors.window
            },

            caption: {
                position: "sticky",
                backgroundColor: template.colors.window,
                backgroundClip: "padding-box",
//                border: "${width}px solid " + template.colors.frame,
                borderLeft: "${width}px solid " + template.colors.frame,
                borderRight: "${width}px solid " + template.colors.frame,
                padding: "4px",
                textAlign: "center",
                fontWeight: "bold",
                color: template.colors.border,
                boxShadow: "inset 0 ${width}px " + template.colors.frame + ", 0 ${width}px " + template.colors.frame
            },

            head: {
            },

            cell: {
                backgroundColor: template.colors.window,
                border: "${width}px solid " + template.colors.frame,
                padding: "4px",
                cursor: "pointer",
            },

            row: {
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