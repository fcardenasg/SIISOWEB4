import React, { useRef, useEffect, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import "./App.css";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import { motion } from "framer-motion";

const VisualizatorFile = ({ file, confirmExport }) => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(true);

  const wvInstanceRef = useRef(null);

  const elementsToHide = [
    // 1. Ocultar el botón de la barra lateral de Miniaturas
    "thumbnailsPanelButton",

    // 2. Ocultar el grupo completo de herramientas de Edición (Crops, Redact, etc.)
    "toolbarGroup-Edit",

    // 3. Ocultar el grupo de Impresión y Descarga en la barra superior
    "downloadButton",
    "printButton",

    // 4. Ocultar el botón principal del Menú (hamburguesa)
    "menuButton",
  ];

  useEffect(() => {
    if (!viewer.current) return;

    let currentInstance = null;

    WebViewer(
      {
        path: "webviewer/lib",
        //  initialDoc: "/files/worddocumento.docx",
        licenseKey:
          "demo:1761750794926:600e04b703000000000ac47f91e817fb676e4cb4fbd05e48a65659e3b1",
        enableOfficeEditing: true,
        fullAPI: true,
        officeEditorOptions: {
          initialEditMode: "editing",
        },
        defaultLanguage: "es",
        disabledElements: elementsToHide,
      },
      viewer.current
    ).then((instance) => {
      console.log("elemento", instance.UI);

      setInstance(instance);

      // ASIGNAMOS LA INSTANCIA A LA VARIABLE LOCAL PARA LIMPIEZA
      wvInstanceRef.current = instance;

      const configUI = {
        modularComponents: {
          // only include the buttons, grouped items, dividers,
          // ribbon items, and ribbon groups that are needed here
          "page-controls-container": {
            dataElement: "page-controls-container",
            type: "pageControls",
          },
          filePickerButton: {
            dataElement: "filePickerButton",
            type: "presetButton",
          },
          saveAsButton: {
            dataElement: "saveAsButton",
            type: "presetButton",
          },
          "menu-toggle-button": {
            dataElement: "menu-toggle-button",
            img: "ic-hamburger-menu",
            title: "component.menuOverlay",
            toggleElement: "MainMenuFlyout",
            type: "toggleButton",
          },
          "zoom-container": {
            dataElement: "zoom-container",
            type: "zoom",
          },
          highlightToolButton: {
            dataElement: "highlightToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateTextHighlight",
          },
          underlineToolButton: {
            dataElement: "underlineToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateTextUnderline",
          },
          strikeoutToolButton: {
            dataElement: "strikeoutToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateTextStrikeout",
          },
          squigglyToolButton: {
            dataElement: "squigglyToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateTextSquiggly",
          },
          freeTextToolButton: {
            dataElement: "freeTextToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateFreeText",
          },
          rectangleToolButton: {
            dataElement: "rectangleToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateRectangle",
          },
          markInsertTextToolButton: {
            dataElement: "markInsertTextToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateMarkInsertText",
          },
          markReplaceTextToolButton: {
            dataElement: "markReplaceTextToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateMarkReplaceText",
          },
          freeHandToolButton: {
            dataElement: "freeHandToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateFreeHand",
          },
          freeHandHighlightToolButton: {
            dataElement: "freeHandHighlightToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateFreeHandHighlight",
          },
          stickyToolButton: {
            dataElement: "stickyToolButton",
            type: "toolButton",
            toolName: "AnnotationCreateSticky",
          },
          "divider-0.4011225832731946": {
            dataElement: "divider-0.4011225832731946",
            type: "divider",
          },
          stylePanelToggle: {
            dataElement: "stylePanelToggle",
            title: "action.style",
            type: "toggleButton",
            img: "icon-style-panel-toggle",
            toggleElement: "stylePanel",
          },
          "divider-0.5730925860609144": {
            dataElement: "divider-0.5730925860609144",
            type: "divider",
          },
          undoButton: {
            dataElement: "undoButton",
            type: "presetButton",
            buttonType: "undoButton",
          },
          redoButton: {
            dataElement: "redoButton",
            type: "presetButton",
            buttonType: "redoButton",
          },
          eraserToolButton: {
            dataElement: "eraserToolButton",
            type: "toolButton",
            toolName: "AnnotationEraserTool",
          },
          defaultAnnotationUtilities: {
            dataElement: "defaultAnnotationUtilities",
            // items here are defined above
            items: [
              "divider-0.4011225832731946",
              "stylePanelToggle",
              "divider-0.5730925860609144",
              "undoButton",
              "redoButton",
              "eraserToolButton",
            ],
            type: "groupedItems",
            grow: 0,
            gap: 12,
            alwaysVisible: false,
            style: {},
          },
          annotateGroupedItems: {
            dataElement: "annotateGroupedItems",
            // items here are defined above
            items: [
              "underlineToolButton",
              "highlightToolButton",
              "rectangleToolButton",
              "freeTextToolButton",
              "freeHandToolButton",
              "freeHandHighlightToolButton",
              "stickyToolButton",
              "squigglyToolButton",
              "strikeoutToolButton",
              "markInsertTextToolButton",
              "markReplaceTextToolButton",
              "defaultAnnotationUtilities",
            ],
            type: "groupedItems",
            justifyContent: "center",
            grow: 0,
            gap: 12,
            alwaysVisible: false,
            style: {},
          },
          "toolbarGroup-View": {
            dataElement: "toolbarGroup-View",
            title: "View",
            type: "ribbonItem",
            label: "View",
            groupedItems: [],
            toolbarGroup: "toolbarGroup-View",
          },
          "toolbarGroup-Annotate": {
            dataElement: "toolbarGroup-Annotate",
            title: "Annotate",
            type: "ribbonItem",
            label: "Annotate",
            groupedItems: ["annotateGroupedItems"],
            toolbarGroup: "toolbarGroup-Annotate",
          },
          "default-ribbon-group": {
            dataElement: "default-ribbon-group",
            // include all the tool groups that you want in the ribbon here
            items: [
              // "toolbarGroup-View",
            ],
            type: "ribbonGroup",
            justifyContent: "center",
            grow: 2,
            gap: 12,
            alwaysVisible: false,
            style: {},
          },
          searchPanelToggle: {
            dataElement: "searchPanelToggle",
            title: "component.searchPanel",
            type: "toggleButton",
            img: "icon-header-search",
            toggleElement: "searchPanel",
          },
          notesPanelToggle: {
            dataElement: "notesPanelToggle",
            title: "component.notesPanel",
            type: "toggleButton",
            img: "icon-header-chat-line",
            toggleElement: "notesPanel",
          },
        },
        modularHeaders: {
          "default-top-header": {
            dataElement: "default-top-header",
            placement: "top",
            grow: 0,
            gap: 12,
            position: "start",
            float: false,
            stroke: true,
            dimension: {
              paddingTop: 8,
              paddingBottom: 8,
              borderWidth: 1,
            },
            style: {},
            // include all items that you want in the top header here
            items: [
              // "menu-toggle-button",
              "zoom-container",
              "default-ribbon-group",
              "searchPanelToggle",
              "notesPanelToggle",
              "page-controls-container",
            ],
          },
          "tools-header": {
            dataElement: "tools-header",
            // choose where you want to place the secondary header here
            placement: "left",
            justifyContent: "start",
            grow: 0,
            gap: 12,
            position: "end",
            float: false,
            stroke: true,
            dimension: {
              paddingTop: 8,
              paddingBottom: 8,
              borderWidth: 1,
            },
            style: {},
            items: ["annotateGroupedItems"],
          },
        },
        panels: {
          // placing all the panels on the right side
          // since the left side is already occupied by the tools header
          stylePanel: {
            dataElement: "stylePanel",
            render: "stylePanel",
            location: "right",
          },
          notesPanel: {
            dataElement: "notesPanel",
            render: "notesPanel",
            location: "right",
          },
          searchPanel: {
            dataElement: "searchPanel",
            render: "searchPanel",
            location: "right",
          },
        },
        flyouts: {
          MainMenuFlyout: {
            dataElement: "MainMenuFlyout",
            items: [
              // include the buttons that are needed in the Main Menu here
              "filePickerButton",
              "divider",
              "saveAsButton",
            ],
          },
        },
      };

      instance.UI.setLanguage("es");
      instance.UI.importModularComponents(configUI);

      if (file) {
        console.log("🔥 CARGA INICIAL DIFERIDA EN MONTAJE:", file.name);

        const objectUrl = URL.createObjectURL(file);

        instance.Core.documentViewer.loadDocument(objectUrl, {
          filename: file.name,
          officeEditor: true,
          extension: 'docx',
          enableOfficeEditing: true,
           officeEditorOptions: {
          initialEditMode: "editing",
        },
          type: "office",
        });

        setLoading(false);

        const currentObjectUrl = objectUrl;
        wvInstanceRef.current.currentObjectUrl = currentObjectUrl;
      } else {
        setLoading(false);
      }
    });

    return () => {
      const instanceToDispose = wvInstanceRef.current;

      if (
        instanceToDispose &&
        typeof instanceToDispose.dispose === "function"
      ) {
        instanceToDispose.dispose();
        console.log("WebViewer ha sido completamente DISPUESTO (destruido).");
      } else if (instanceToDispose) {
        console.warn(
          "WV Instance capturada, pero dispose no es una función. Limpiando DOM."
        );
      } else {
        console.log(
          "WV Instance no pudo ser dispuesta porque no estaba lista."
        );
      }

      if (viewer.current) {
        viewer.current.innerHTML = "";
      }
    };
  }, [confirmExport]);

  const exportarPDF = () => {
    instance.UI.downloadPdf({
      filename: "documento.pdf",
    });
  };

  useEffect(() => {
    console.log("exportar");
    if (!instance) return;

    exportarPDF();
  }, [confirmExport, instance]);

  // ⬅️ NUEVO: cargar archivos desde el computador
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    instance.UI.loadDocument(file, {
      filename: file.name,
      officeEditor: true, // 👈 fuerza modo edición
    });
  };

  // EFECTO 2: CARGA DE DOCUMENTO DINÁMICO
  // useEffect(() => {
  //     // 1. Accede a la instancia viva desde la referencia
  //     const instance = wvInstanceRef.current;

  //     console.log("file", file);
  //     console.log("instance", instance); // <-- Aquí debe ser el objeto WebViewer

  //     if (file && instance) {
  //         console.log("🚚 CARGANDO NUEVO ARCHIVO DESDE PROP:", file.name);

  //         instance.Core.documentViewer.loadDocument(file, {
  //             filename: file.name,
  //             officeEditor: true,
  //         });

  //     }

  //     // 🔑 CLAVE: Añadir wvInstanceRef.current como dependencia (o simular el cambio)
  //     // Esto fuerza a React a re-ejecutar el efecto una vez que la referencia se actualiza de null a objeto.
  // }, [file, confirmExport, wvInstanceRef.current]);

  // EFECTO 2: CARGA DE DOCUMENTO DINÁMICO
  // useEffect(() => {
  //     // 1. Accede a la instancia viva desde la referencia
  //     const instance = wvInstanceRef.current;

  //     if (file && instance) {
  //         console.log("🚚 CARGANDO NUEVO ARCHIVO DESDE PROP:", file.name);

  //         // Desestructurar Core desde la instancia
  //         const { Core } = instance;

  //         // 1. Crear una URL de objeto para el archivo File
  //         const objectUrl = URL.createObjectURL(file);

  //         // 2. Usar documentViewer.loadDocument con opciones forzadas
  //         Core.documentViewer.loadDocument(objectUrl, {
  //             filename: file.name,
  //             officeEditor: true,
  //             type: 'office', // 🔑 FORZAR el uso del Office Editor
  //         });

  //         // Opcional: Liberar la URL de objeto anterior
  //         if (wvInstanceRef.current.currentObjectUrl) {
  //             URL.revokeObjectURL(wvInstanceRef.current.currentObjectUrl);
  //         }
  //         wvInstanceRef.current.currentObjectUrl = objectUrl; // Guardar la nueva URL para futura limpieza
  //     }

  // }, [file, wvInstanceRef.current]);

  return (
    <>
      {/* WebViewer animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", height: "100vh" }}
      >
        <div ref={viewer} style={{ width: "100%", height: "100%" }}></div>
      </motion.div>
    </>
  );
};

export default VisualizatorFile;
