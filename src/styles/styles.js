export default function defaultStyles(template) {

    return {

        TIcon: {
            container: {
                width: "32px",
                height: "32px",
                color: template.colors.border,
                flexShrink: "0"
            },
            wait: {
                color: template.colors.wait
            }
        },

        TButton: {
            container: {
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 16px 8px 16px",
                backgroundColor: template.colors.face,
                color: template.colors.text,
                borderRadius: "8px",
                textAlign: "center",
                border: "none",
                borderLeft: "1px solid " + template.colors.frame,
                borderTop: "1px solid " + template.colors.frame,
                borderBottom: "1px solid " + template.colors.frame,
                borderRight: "1px solid " + template.colors.frame,
                ...template.fonts.common
            },
            wait: {
                color: template.colors.wait
            },
            down: {
                border: "none",
                backgroundColor: template.colors.down,
                borderLeft: "1px solid " + template.colors.border,
                borderTop: "1px solid " + template.colors.border,
                borderBottom: "1px solid " + template.colors.window,
                borderRight: "1px solid " + template.colors.window
            }
        },

        TGroupButton: {

            container: {
            },

            icon: {
                container: {
                    width: "21px",
                    height: "21px",
                    textAlign: "right",
                    color: template.colors.border
                }
            },

            button: {
                cursor: "pointer",
                padding: "8px 8px 8px 8px"
            },

            caption: {
                padding: "0 8px 0 8px"
            },

            placeholder: {
                color: template.colors.placeholder
            },

            left: {
                borderRadius: "8px 0 0 8px"
            },

            right: {
                borderRadius: "0 8px 8px 0"
            },

            middle: {
                borderRadius: "0 0 0 0"
            }

        },

        TSelectBox: {

            caption: {
                backgroundColor: template.colors.window
            },

            placeholder: {
                color: template.colors.placeholder
            },

            item: {
                margin: "4px 8px 4px 8px"
            },

            pager: {
                container: {
                    margin: "4px 8px 4px 8px",
                    fontSize: "22px"
                },
                page: {
                    width: "64px",
                    height: "38px",
                    borderRadius: "8px"
                }
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
                minHeight: "29px",
                padding: "4px 4px 2px 4px",
                border: "1px solid " + template.colors.frame,
                color: template.colors.text,
                outline: "none",
                textAlign: "left",
                ...template.fonts.common
            },

            icon: {
                container: {
                    width: "21x",
                    height: "21px",
                    textAlign: "right",
                    color: template.colors.border,
                    cursor: "pointer",
                    margin: "0 0 0 4px"
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

            },

            nested: {

                edit: {
                    borderRight: "none"
                },

                icon: {
                    container: {
                        borderLeft: "none"
                    }
                }

            }

        },

        TListBox: {

            list: {

                container: {
//                    backgroundColor: template.colors.window,
                    boxSizing: "border-box"
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
                    ...template.fonts.common,
                    boxSizing: "border-box"
                },

                selected: {
                    fontWeight: "bold"
                },

                hover: {
                    backgroundColor: "#fff",
                    border: "1px solid " + template.colors.border
                }

            },

            modal: {

                header: {
                    margin: "8px 4px 8px 4px",
                    ...template.fonts.common
                },

                caption: {
                    margin: "0",
                    padding: "0"
                },

                content: {
                    padding: "2px",
                    margin: "0"
                },

                footer: {
                    margin: "0",
                    padding: "0"
                }

            }

        },

        TInput: {

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
                borderRadius: "12px",
                maxWidth: "600px",
                minWidth: "320px",
                width: "55%",
                padding: "4px",
                boxSizing: "border-box"
            },

            containerHidden: {
                opacity: "0"
            },

            header: {
                margin: "8px",
                ...template.fonts.common
            },

            close: {
                margin: "0",
                padding: "0",
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
                margin: "8px",
                ...template.fonts.common
            },

            footer: {
                margin: "8px"
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
                minHeight: "29px",
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
            container: {
                backgroundImage: "linear-gradient(" + template.colors.panel + ", " + template.colors.window + ")",
                color: template.colors.border,
                ...template.fonts.common
            }
        },

        TTop: {

            container: {
                backgroundColor: template.colors.panel
            },

            button: {
                flexShrink: "0",
                color: template.colors.border,
                height: "32px",
                width: "32px"
            },

            caption: {
                ...template.fonts.common,
                color: template.colors.border,
                fontSize: "24px",
                margin: "0 8px 0 8px",
                textAlign: "center"
            },

            tools: {
            },

            icon: {
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
                border: "none",
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
            },

            separator: {
                padding: "0",
                margin: "0 32px 0 32px",
                borderTop: "1px solid " + template.colors.frame
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
            },

            separator: {
                padding: "0",
                margin: "0 32px 0 32px",
                borderTop: "1px solid " + template.colors.frame
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
                justifyContent: "space-around"
            }

        },

        TResponse: {

            container: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
            },

            button: {
                container: {
                }
            }

        },

        TDate: {

            container: {
                width: "220px"
            },

            calendar: {
                container: {
                    backgroundColor: template.colors.window
                }
            }

        },

        TScroll: {
            container: {
                ...template.fonts.common,
                backgroundColor: template.colors.window,
                width: "100%",
                boxSizing: "border-box"
            },

            content: {
                boxSizing: "border-box"
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
            },

            ellipsis: {

            }

        },

        TLoad: {
            icon: {
                container: {
                    color: template.colors.border,
                    opacity: "0.5",
                    width: "48px",
                    height: "48px"
                }
            }
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
                border: "none",
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

        TFlexList: {

        },

        TItemGroup: {

        },

        TEdit: {
            width: "100%",
            minHeight: "22px"
        },

        TPopup: {
            frame: {
                cursor: "pointer"
            },
            label: {
                cursor: "pointer",
                padding: "0",
                width: "100%"
            },
            icon: {
                container: {
                    cursor: "pointer",
                }
            }
        },

        TCalendar: {

            container: {
                minWidth: "273px",
                boxSizing: "border-box"
            },

            content: {
                width: "100%"
            },

            label: {
                textAlign: "center",
                ...template.fonts.common,
                color: template.colors.border,
                whiteSpace: "normal",
                margin: "0 0 8px 0"
            },

            day: {

                container: {
                    minWidth: "38px",
                    margin: "0 -1px -1px 0"
                },

                content: {
                    ...template.fonts.small,
                    color: template.colors.border,
                    fontWeight: "bold"
                }

            },

            date: {

                container: {
                    minHeight: "36px",
                    margin: "0 -1px -1px 0",
                    border: "1px solid " + template.colors.frame,
                    color: template.colors.text
                },

                content: {
                    cursor: "pointer",
                    ...template.fonts.common
                },

                current: {
                    border: "2px solid " + template.colors.signal
                },

                inactive: {
                    color: template.colors.face,
                    cursor: "default"
                },

                selected: {
                    backgroundColor: template.colors.face,
                    fontWeight: "bold"
                }

            },

            navigator: {
                container: {
                    margin: "0 0 8px 0",
                    color: template.colors.border
                },
                month: {
                    margin: "0 2px 0 0 "
                },
                year: {
                    margin: "0 0 0 2px"
                },
                button: {
                    border: "1px solid " + template.colors.frame,
                    textAlign: "center",
                    cursor: "pointer",
                    margin: "0 -1px -1px 0",
                    padding: "2px 10px 4px 10px"
                }
            }

        }

    }

}