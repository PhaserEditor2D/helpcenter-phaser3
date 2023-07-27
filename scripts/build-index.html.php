<?php

$editorFolder = __DIR__ . "/../source/editor/app";

$json = file_get_contents(__DIR__ . "/../package.json");
$EDITOR_VER = json_decode($json)->version;

$renderInfoArray = array();

// read plugins config

$folders = scandir($editorFolder . "/plugins");

foreach ($folders as $pluginName) {

    if ($pluginName === "." || $pluginName === "..") {

        continue;
    }

    $pluginFile = "$editorFolder/plugins/$pluginName/plugin.json";

    if (file_exists($pluginFile)) {

        $hash = filemtime($pluginFile);

        $content = file_get_contents($pluginFile);

        $pluginData = json_decode($content);

        $id = $pluginData->id;

        $renderInfo = array(
            "id" => $id,
            "scripts" => array(),
            "styles" => array(),
            "priority" => count($renderInfoArray) /* a hack to get a stable sorting */,
            "hash" => $hash
        );

        if (isset($pluginData->styles)) {

            foreach ($pluginData->styles as $style) {

                array_push($renderInfo["styles"], "<link href=\"/editor/app/plugins/$id/$style?v=$hash\" rel=\"stylesheet\">");
            }
        }

        if (isset($pluginData->scripts)) {

            foreach ($pluginData->scripts as $script) {

                array_push($renderInfo["scripts"], "<script src=\"/editor/app/plugins/$id/$script?v=$hash\"></script>");
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

    return $a1 < $b1 ? -1 : 1;
});

header("Content-Type: text/html; charset=UTF-8");

?>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Unofficial Phaser Help Center | Phaser Editor 2D</title>

    <link rel="icon" type="image/png" href="/editor/static/favicon.png">

    <link rel="manifest" href="./manifest.json" />
    <!-- ios support -->
    <link rel="apple-touch-icon" href="/icons/icon-72.png" />
    <link rel="apple-touch-icon" href="/icons/icon-96.png" />
    <link rel="apple-touch-icon" href="/icons/icon-128.png" />
    <link rel="apple-touch-icon" href="/icons/icon-144.png" />
    <link rel="apple-touch-icon" href="/icons/icon-152.png" />
    <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    <link rel="apple-touch-icon" href="/icons/icon-384.png" />
    <link rel="apple-touch-icon" href="/icons/icon-512.png" />
    <meta name="apple-mobile-web-app-status-bar" content="#242424" />
    <meta name="theme-color" content="#242424" />

    <!-- open-graph card -->
    <meta name="og:title" content="Unofficial Phaser Help Center v<? echo $EDITOR_VER ?> | Phaser Editor 2D">
    <meta name="og:description" content="Integrated tool for browsing the Phaser docs and examples.">
    <meta name="og:image" content="https://helpcenter.phasereditor2d.com/editor/app/screenshot.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@PhaserEditor2D">
    <meta name="twitter:creator" content="@PhaserEditor2D">
    
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
        <img id="splash" src="/editor/static/splash.svg" width="128" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)">
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