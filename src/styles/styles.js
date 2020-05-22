export default function defaultStyles(templates) {

    return {

        TIcon: {
            container: {
                boxSizing: "border-box",
                width: "32px",
                height: "32px",
                color: templates.colors.border,
                flexShrink: "0",
                flexGrow: "0"
            },
            wait: {
                color: templates.colors.wait
            }
        },

        TButton: {
            container: {
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 16px 8px 16px",
                backgroundColor: templates.colors.face,
                color: templates.colors.text,
                borderRadius: "8px",
                textAlign: "center",
                border: "none",
                borderLeft: "1px solid " + templates.colors.frame,
                borderTop: "1px solid " + templates.colors.frame,
                borderBottom: "1px solid " + templates.colors.frame,
                borderRight: "1px solid " + templates.colors.frame,
                ...templates.fonts.common
            },
            wait: {
                color: templates.colors.wait
            },
            down: {
                border: "none",
                backgroundColor: templates.colors.down,
                borderLeft: "1px solid " + templates.colors.border,
                borderTop: "1px solid " + templates.colors.border,
                borderBottom: "1px solid " + templates.colors.window,
                borderRight: "1px solid " + templates.colors.window
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
                    color: templates.colors.border
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
                color: templates.colors.placeholder
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
                backgroundColor: templates.colors.window
            },

            placeholder: {
                color: templates.colors.placeholder
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
                color: templates.colors.indicator,
                flex: "0 0 24px",
                textAlign: "center",
                fontWeight: "bold",
                ...templates.fonts.common
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
                color: templates.colors.border,
                outline: "none",
                textAlign: "left",
                ...templates.fonts.common
            },

            edit: {
                minHeight: "29px",
                padding: "4px 4px 2px 4px",
                border: "1px solid " + templates.colors.frame,
                color: templates.colors.text,
                textAlign: "left",
                ...templates.fonts.common
            },

            icon: {
                container: {
                    width: "21x",
                    height: "21px",
                    textAlign: "right",
                    color: templates.colors.border,
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
                icon: {
                    container: {
                        margin: "0",
                        padding: "0 0 2px 0"
                    }
                }
            }

        },

        TListBox: {

            list: {

                container: {
                    boxSizing: "border-box"
                },

                item: {
                    padding: "8px",
                    border: "1px solid " + templates.colors.frame,
                    color: templates.colors.text,
                    outline: "none",
                    backgroundColor: templates.colors.panel,
                    cursor: "pointer",
                    textAlign: "center",
                    tabindex: "0",
                    ...templates.fonts.common,
                    boxSizing: "border-box"
                },

                selected: {
                    fontWeight: "bold"
                },

                hover: {
                    backgroundColor: "#fff",
                    border: "1px solid " + templates.colors.border
                }

            },

            modal: {

                header: {
                    margin: "8px 4px 8px 4px",
                    ...templates.fonts.common
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

            },

            tree: {
                container: {
                    position: "relative",
                    top: "-1px",
                    left: "0",
                    zIndex: "2",
                    boxSizing: "border-box",
                    border: "1px solid " + templates.colors.frame,
                    backgroundColor: templates.colors.window,
                    padding: "8px"
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

            container: {
                opacity: "1",
                transitionProperty: "opacity",
                transitionDuration: "${transition}ms",
                backgroundColor: templates.colors.window,
                borderRadius: "12px",
                maxWidth: "600px",
                minWidth: "320px",
                width: "55%",
                padding: "4px",
                boxSizing: "border-box"
            },

            header: {
                margin: "8px",
                ...templates.fonts.common
            },

            title: {
                boxSizing: "border-box",
                width: "100%"
            },

            close: {
                margin: "0",
                padding: "0",
                color: templates.colors.border,
                width: "24px",
                height: "24px",
                ...templates.fonts.common
            },

            timer: {
                ...templates.fonts.common,
                color: templates.colors.signal,
                fontSize: "24px",
                width: "48px"
            },

            caption: {
                color: templates.colors.border,
                textAlign: "center",
                margin: "0 8px 0 8px",
                ...templates.fonts.common
            },

            content: {
                color: templates.colors.text,
                margin: "8px",
                ...templates.fonts.common
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
                ...templates.fonts.common,
                margin: "16px",
                color: "#393",
                textAlign: "center"
            },

            error: {
                ...templates.fonts.common,
                margin: "16px",
                color: "#a13b3b",
                textAlign: "center"
            },

            button: {
                ...templates.fonts.common,
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
                border: "1px solid " + templates.colors.border
            }

        },

        TGroup: {

            content: {
                padding: "12px",
                border: "1px solid " + templates.colors.border
            },

            label: {
                margin: "0 0 -8px 8px",
                padding: "0 4px 0 4px",
                backgroundColor: templates.colors.window
            }

        },

        TPanel: {
            container: {
                backgroundImage: "linear-gradient(" + templates.colors.panel + ", " + templates.colors.window + ")",
                color: templates.colors.border,
                ...templates.fonts.common
            }
        },

        TTop: {

            container: {
                backgroundColor: templates.colors.panel
            },

            button: {
                flexShrink: "0",
                color: templates.colors.border,
                height: "32px",
                width: "32px"
            },

            caption: {
                ...templates.fonts.common,
                color: templates.colors.border,
                fontSize: "24px",
                margin: "0 8px 0 8px",
                textAlign: "center"
            },

            tools: {
            },

            icon: {
                color: templates.colors.border,
                height: "32px",
                width: "32px",
                margin: "0 0 0 8px"
            },

            clickable: {
                cursor: "pointer"
            },

            rotate: {
                color: templates.colors.signal
            }

        },

        TSide: {

            container: {
                backgroundColor: templates.colors.panel,
                paddingTop: "60px",
                border: "none",
                borderRight: "1px solid " + templates.colors.frame
            },

            close: {
                color: templates.colors.border
            },

            item: {
                ...templates.fonts.common,
                padding: "8px 8px 8px 32px",
                fontSize: "24px",
                color: templates.colors.text
            },

            current: {
                fontWeight: "bold",
                marginLeft: "8px"
            },

            separator: {
                padding: "0",
                margin: "0 32px 0 32px",
                borderTop: "1px solid " + templates.colors.frame
            }

        },

        TMenu: {

            content: {
                paddingTop: "8px"
            },

            item: {
                ...templates.fonts.common,
                padding: "8px 8px 8px 32px",
                fontSize: "24px",
                color: templates.colors.text
            },

            current: {
                fontWeight: "bold",
                marginLeft: "8px"
            },

            separator: {
                padding: "0",
                margin: "0 32px 0 32px",
                borderTop: "1px solid " + templates.colors.frame
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
                ...templates.fonts.common,
                margin: "16px",
                color: templates.colors.error
            },

            message: {
                ...templates.fonts.common,
                margin: "16px",
                color: templates.colors.message
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
                    padding: "8px",
                    margin: "-1px 0 0 0",
                    border: "1px solid " + templates.colors.border,
                    backgroundColor: templates.colors.window
                }
            }

        },

        TScroll: {
            container: {
                ...templates.fonts.common,
                backgroundColor: templates.colors.window,
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
                border: "1px solid " + templates.colors.frame
            },

            current: {
                backgroundColor: templates.colors.face,
                fontWeight: "bold"
            },

            wait: {
                backgroundColor: templates.colors.window,
                color: "#ddd"
            },

            ellipsis: {

            }

        },

        TLoad: {
            icon: {
                container: {
                    color: templates.colors.border,
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
                backgroundColor: templates.colors.window,
                padding: "0 0 4px 0",
                fontWeight: "normal"
            },

            caption: {
                backgroundColor: templates.colors.window,
                border: "${width}px solid " + templates.colors.frame,
                marginLeft: "-${width}px",
                marginTop: "-${width}px",
                padding: "4px",
                textAlign: "center",
                fontWeight: "bold",
                color: templates.colors.border
            },

            head: {
                // Deprecated!
            },

            cell: {
                backgroundColor: templates.colors.window,
                border: "${width}px solid " + templates.colors.frame,
                marginLeft: "-${width}px",
                marginTop: "-${width}px",
                padding: "4px",
                cursor: "pointer"
            },

            row: {
                // Deprecated!
            },

            selected: {
                backgroundColor: templates.colors.panel,
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
                backgroundColor: templates.colors.window,
                padding: "0 0 4px 0",
                fontWeight: "normal",
                textAlign: "center",
                boxShadow: "-${width}px 0 " + templates.colors.window + ", ${width}px 0 " + templates.colors.window
            },

            caption: {
                position: "sticky",
                backgroundColor: templates.colors.window,
                backgroundClip: "padding-box",
                border: "none",
                borderLeft: "${width}px solid " + templates.colors.frame,
                borderRight: "${width}px solid " + templates.colors.frame,
                padding: "4px",
                textAlign: "center",
                fontWeight: "bold",
                color: templates.colors.border,
                boxShadow: "inset 0 ${width}px " + templates.colors.frame + ", 0 ${width}px " + templates.colors.frame
            },

            head: {
            },

            cell: {
                backgroundColor: templates.colors.window,
                border: "${width}px solid " + templates.colors.frame,
                padding: "4px",
                cursor: "pointer",
            },

            row: {
            },

            selected: {
                backgroundColor: templates.colors.panel,
                fontWeight: "bold"
            }

        },

        TRibbon: {

            title: {
                backgroundColor: templates.colors.window,
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
                cursor: "pointer",
                width: "100%"
            },
            label: {
                cursor: "pointer",
                padding: "0",
                width: "100%"
            },
            icon: {
                container: {
                    cursor: "pointer"
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
                ...templates.fonts.common,
                color: templates.colors.border,
                whiteSpace: "normal",
                margin: "0 0 8px 0"
            },

            day: {

                container: {
                    minWidth: "38px",
                    margin: "0 -1px -1px 0"
                },

                content: {
                    ...templates.fonts.small,
                    color: templates.colors.border,
                    fontWeight: "bold"
                }

            },

            date: {

                container: {
                    minHeight: "36px",
                    margin: "0 -1px -1px 0",
                    border: "1px solid " + templates.colors.frame,
                    color: templates.colors.text
                },

                content: {
                    cursor: "pointer",
                    ...templates.fonts.common
                },

                current: {
                    border: "2px solid " + templates.colors.signal
                },

                inactive: {
                    color: templates.colors.face,
                    cursor: "default"
                },

                selected: {
                    backgroundColor: templates.colors.face,
                    fontWeight: "bold"
                }

            },

            navigator: {
                container: {
                    margin: "0 0 8px 0",
                    color: templates.colors.border
                },
                month: {
                    margin: "0 2px 0 0 "
                },
                year: {
                    margin: "0 0 0 2px"
                },
                button: {
                    border: "1px solid " + templates.colors.frame,
                    textAlign: "center",
                    cursor: "pointer",
                    margin: "0 -1px -1px 0",
                    padding: "2px 10px 4px 10px"
                }
            }

        },

        TTree: {
            container: {
            },
            node: {
                container: {
                },
                frame: {
                },
                icon: {
                    width: "12px",
                    height: "12px",
                    margin: "0 4px 2px 0"
                },
                caption: {
                    cursor: "pointer"
                },
                content: {
                    margin: "0 0 0 16px"
                },
                selected: {
                    caption: {
                        fontWeight: "bold"
                    }
                }
            }
        }

    }

}