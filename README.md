![Screenshot](source/app/screenshot.png)

# Unofficial Phaser Help Center

The [Unofficial Phaser Help Center](https://helpcenter.phasereditor2d.com) is an integrated, desktop-like, online/offline tool, for browsing the [Phaser.io](https://phaser.io) documentation and examples. Phaser is a popular HTML5 game framework.

This is not an official Phaser product. It is developed and maintained by the [Phaser Editor 2D team](https://phasereditor2d.com).

## Index

* [Launching](#launching)
* [Overview](#overview)
* [API view](#api-view)
    * [Layout](#layout)
    * [Inherited members](#inherited-members)
    * [Category filter](#category-filter)
    * [Text filter](#text-filter)
* [Phaser Files](#phaser-files)
    * [Phaser Files view's context menu](#phaser-files-views-context-menu)
* [API Chains view](#api-chains-view)
    * [API chains](#api-chains)
    * [Query syntax](#query-syntax)
    * [Chains syntax](#chains-syntax)
    * [Chains context menu](#chains-context-menu)
* [Examples view](#examples-view)
* [Example Player](#example-player)
* [Examples Code view](#examples-code-view)
* [Inspector view](#inspector-view)
    * [Inspecting the Phaser API elements](#inspecting-the-phaser-api-elements)
    * [Inspecting a Phaser example](#inspecting-a-phaser-example)
* [Documentation editor](#documentation-editor)
* [Examples Folder editor](#examples-folder-editor)
* [Code editor](#code-editor)
* [Development](#development)
* [License](#license)

## Launching

This tool is online at [helpcenter.phasereditor2d.com](https://helpcenter.phasereditor2d.com). It requires a modern, updated browser. 

It uses Progressive Web Application (PWA) techniques, so you can install it in your OS and open it offline.

Our recommendation is to use Google Chrome. This browser provides the best PWA support for the desktop.

Also, you can download this repository and launch it locally. Just copy the content of the `dist/` folder in a directory served by Apache or any other PHP-compatible web server.

If you have PHP installed in your system, you can run:

```
php -S localhost:9090 -t dist
```

if you want to avoid registering a service worker (for offline support), append the `?dev` query to the URL: `http://localhost:9090?dev`.

## Overview

This tool provides different views of the Phaser documentation and examples.

The **API**, **Phaser Files**, and **API Chains** views show the Phaser documentation content but with different layouts and syntax.

The **Examples** and **Examples Code** views show the content of the Phaser examples.

The **Inspector** shows the information related to the element selected in the active view or editor. For example, if you select an example in the **Examples** view, the **Inspector** view shows the example's code and a screenshot image.

The **editor area** allows opening certain content in a tab. So you can open many tabs and close them. You can open here things like the documentation or source code of an API element, the source code of an example, or a group of examples.

## API view

The API view shows the Phaser API with a hierarchical layout.

You can open an API element in a Documentation editor by double-clicking on it. Also, with the context menu, you can select opening an element's source code in an editor.

When you select an element, the **Inspector** view shows the documentation.


### Layout

By default, it shows a **Flat** layout. It shows a list of all the namespaces. Only classes and types are shown in a second level. You can change it to a **Tree** layout using the context menu:

![API view layout](github/api-view-layout.png)

## Inherited members

By default, it shows all the members of a class, including inherited members. If you want to hide the inherited members, open the context menu and unselect the **Show Inherited Members** option.

Inherited members are shown with a gray color:

![Inherited members](github/api-view-inherited-members.png)

### Category filter

You can filter the content by category.

The **Type** category contains all classes and types.

The **Constant** category contains all constants.

The **Event** category shows all events.

You can select only one category at the same time. To clear the "category filter", click again on the selected category:

![Filtering by category](github/api-view-category-filtering.png)

### Text filter

You can perform text queries for matching the signature of the elements:

![API view filtering](github/api-view-filtering.png)


## Phaser Files

The **Phaser Files** shows all the Phaser source files. It follows the same structure of the Phaser repository, but under each file, it shows the API elements defined in it.

This view helps you on finding the relation between the Phaser API and the source file structure.

In Phaser, it is common to find API elements belonging to the same namespace but are defined in separate files. It is the case of the `Phaser.Loader.LoaderPlugin.spritesheet()` method. In the **API** view it is shown in the `Phaser.Loader.LoaderPlugin` class. However, like many other "loader methods", it is defined in its file, the `SpriteSheetFile.js`, in the `src/loader/filetypes/` folder.

This view helps you understand how the Phaser 3 code is structured.

![Phaser Files view](github/phaser-files-comparison.png)

### Phaser Files view's context menu

The context menu shows the options to open the selected API element in a documentation editor, a source editor, or reveal it in the **API** view.

## API Chains view

If you follow the Phaser community since the Phaser 2 days, maybe you remember the [Phaser Chains](https://chains-phaser2.phasereditor2d.com/) tool we did for Phaser 2. It also was included in the Phaser Editor v1 and Phaser Editor v2.

It had certain popularity because of its particular way of browsing the Phaser API.

Now, we include it in the Unofficial Phaser Help Center.

### API chains

The particularity of this view is that it shows all the elements of the Phaser API in a list. It renders the member with its full name and signature. But also, and this is the key point, it shows chains elements.

In Phaser games, you can write a lot of code with a chain of property/method class. For example, you load the assets this way:

```
this.load.spritesheet(...)
this.load.atlas(...)
```

You chain the scene's `load` property with the `spritesheet()` method.

You follow the same style for adding new objects to the scene:

```
this.add.sprite(...)
this.add.text(...)
```

You chain the scene's `add` property with the `sprite()` method.

The **API Chains** takes advantage of this syntax and shows these chains. This means you can search for idiomatic constructions like `this.add.sprite` and it will show all chains matching it:

![Chains](github/chains-result-1.png)

### Query syntax

You can use different "tricks" for making more accurate filters.

To allow writing idiomatic code and matching the right chains, the `this` word at the beginning of the query matches with the `Phaser.Scene` text. We call it expansion. You write `this pause(` and it expands to `Phaser.Scene pause(`. The expanded form, or pattern, is the one used for the search.

The query does not allow special symbols or wildcards. Each word is separated by a space and the matching chains should contain all the words in the same order.

### Chains syntax

A chain syntax is very similar to JavaScript syntax. It shows the full name of an API element with its signature and kind (member, function, class, etc...).

At the end of a chain, there are special "tags". These tags help narrow the resulting chains. These are the currently supported tags and what it means:

* `#i`: the API member is inherited.
* `#d`: the API member is declared (not inherited).
* `#c`: the row is a chain of property/method calls.
* `#u`: the row is just a member (un-chained).

For example, if you want to know all the classes with a `scaleX` property, you query for `.scaleX: #u`. Those are a lot. So you want to know only the classes where a `scaleX` property is declared. Then you query for `.scaleX: #d #u`:

![Chains syntax](github/chains-syntax-1.png)

### Chains context menu

Like the other API-related views, the context menu shows the options for opening the selected element in the documentation editor or the source editor. Or reveal it in the **API** view.

## Examples view

The **Examples** view shows all the content in a hierarchy of categories (or folders). It follows the same structure of the [Phaser official examples](https://phaser.io/examples) but is shown as a tree.

This allows performing quick queries on the examples, by the example's name or the category's name.

Each example shows a small screenshot image of the example.

![Examples view](github/examples-view.png)

The main function of this view is that you can select an example and run it. When you double-click an example, it opens the **Example Player** and runs it. Check the next section.

The context menu provides other options, like open the example in the source editor or the examples folder editor. 

## Example Player

The **Example Player** is a dialog that runs an example. You can open it by double-clicking in an example item of the **Examples** view. Or by selecting the **Play** option in the context menu in other parts.

![Example player](github/example-player.png)

The dialog contains buttons with different functions:

* **Open In Phaser Labs**: it opens the example in a new tab of the browser. The examples are hosted on the official Phaser Labs website. Later we explain how to change it and host them locally.
* **Open In Sandbox**: it opens the example in the Sandbox of the Phaser Labs website. This sandbox allows you to change the code of the example and run it with the modifications. It is an amazing resource for learning the Phaser.
* **View Source**: it opens the example's code in the source editor of the Help Center.
* **Refresh**: it reloads the example.
* **Close**: it closes the dialog.

As we mentioned before, the examples are hosted on the Phaser Labs website (http://labs.phaser.io). However, if your internet connection is slow, or you are not connected at all, you can download the Phaser examples and run them locally.

These are the steps:

* Download the Phaser examples from the repository: https://github.com/photonstorm/phaser3-examples

* Follow the instructions in the README file to run the examples locally. By default, it runs in the `http://127.0.0.1:8080` address.

* Open the Help Center Settings (main menu, right corner, the Settings option), and enter the new address for the Phaser Labs:

    ![Settings](github/settings.png)

## Examples Code view

This view shows the source code of every Phaser example, so you can search for pieces of code. Like in the **Examples** view, the context menu show options for playing the example or opening it in the source editor.

![Examples code view](github/examples-code-view.png)

If you double click an item (example's line), it opens the source editor and scrolls to the line.

## Inspector view

The Inspector view is a general-purpose view. It shows information about the element selected in the active view or editor.

### Inspecting the Phaser API elements

When you select an API element in the **API** or **API Chains** view, the Inspector view shows:

* The documentation (JSDoc).
* Some information about the file where the element is defined.

![API element in Inspector](github/inspector-api-element.png)

### Inspecting a Phaser example

When you select an example in any part, the Inspector view shows the information related to that example:

* The example file info. It shows a button for opening the file in the source editor. And a button for play the example.
* The source code of the example. In case you select an example's line in the **Examples Code** view, the line is highlighted in the Inspector view.
* The screenshot image of the example.

![Example in Inspector view](github/inspector-example.png)

## Documentation editor

You can open the Phaser API elements in the Documentation editor. It allows you open multiple documentation in different tabs. This editor shows the documentation with HTML format:

![Documentation editor](github/docs-editor.png)

When you click on an API element inside the editor, it opens a new editor.

## Examples Folder editor

The Phaser examples are grouped in folders or categories. You can open a category in the **Examples Folder** editor. It shows a grid of the examples belonging to that category.

When you select an example, the main toolbar shows two buttons, for playing the example or opening it in the source editor. Also, the Inspector view shows the properties of the selected example.

![Examples Folder editor](github/examples-folder-editor.png)

## Code editor

The JavaScript code editor is used for showing the source code of the Phaser API or the Phaser examples.

![Source editor](github/source-editor.png)

## Development

TODO

## License

MIT License.

This tool is free. All the code is available for you. You can modify it, run it on your local device or your public website. Credits are not required but appreciated.
