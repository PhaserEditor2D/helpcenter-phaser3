<?php

$renderInfoArray = array();

// read plugins config

$editorFolder = __DIR__ . "/app";

$folders = scandir($editorFolder . "/plugins");

foreach ($folders as $pluginName) {

    if ($pluginName === "." || $pluginName === "..") {

        continue;
    }

    $pluginFile = "$editorFolder/plugins/$pluginName/plugin.json";

    if (file_exists($pluginFile)) {

        $content = file_get_contents($pluginFile);

        $pluginData = json_decode($content);

        $id = $pluginData->id;

        $renderInfo = array(
            "id" => $id,
            "scripts" => array(),
            "styles" => array(),
            "priority" => count($renderInfoArray) /* a hack to get a stable sorting */
        );

        if (isset($pluginData->styles)) {

            foreach ($pluginData->styles as $style) {

                array_push($renderInfo["styles"], "<link href=\"app/plugins/$id/$style?v=$EDITOR_VER\" rel=\"stylesheet\">");
            }
        }

        if (isset($pluginData->scripts)) {

            foreach ($pluginData->scripts as $script) {

                array_push($renderInfo["scripts"], "<script src=\"app/plugins/$id/$script?v=$EDITOR_VER\"></script>");
            }
        }

        if (isset($pluginData->priority)) {
            
            $renderInfo["priority"] = $pluginData->priority * 1000 /* a hack to get a stable sorting */;
        }

        array_push($renderInfoArray, $renderInfo);        
    }
}

usort($renderInfoArray, function ($a, $b) {

    $a1 = $a["priority"];
    $b1 = $b["priority"];

    if ($a1 == $b1) {

        return 0;
    }

    return $a1 < $b1? -1 : 1;
});

header("Content-Type: text/html; charset=UTF-8");

?>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Phaser Editor 2D - v<?php echo $EDITOR_VER ?></title>

    <link rel="icon" type="image/png" href="app/favicon.png">

    <?php

    foreach ($renderInfoArray as $renderInfo) {

        $styles = $renderInfo["styles"];

        if (!empty($styles)) {

            echo "\t<!-- " . $renderInfo["id"] . " -->\n";

            foreach ($styles as $style) {

                echo "\t$style\n";
            }

            echo "\n";
        }
    }

    ?>

    <style>
        #splash {
            animation-name: splashAnim;
            animation-delay: 0ms;
            animation-duration: .5s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
        }

        @keyframes splashAnim {
            from {
                opacity: 0.8;
            }

            to {
                opacity: 1;
            }
        }

        #splash-container {
            width: 100%;
            height: 100%;
            position: fixed;
            background: #242424;
        }
    </style>

</head>

<body>

    <div id="splash-container">
        <img id="splash" src="app/splash.svg" width="128" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)">
    </div>

    <script>
    </script>

    <?php

    foreach ($renderInfoArray as $renderInfo) {

        $scripts = $renderInfo["scripts"];

        if (!empty($scripts)) {

            echo "\t<!-- " . $renderInfo["id"] . " -->\n";

            foreach ($scripts as $script) {

                echo "\t$script\n";
            }

            echo "\n";
        }
    }

    ?>
</body>

</html>