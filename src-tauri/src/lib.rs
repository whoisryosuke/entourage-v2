use std::process::Command;

#[tauri::command]
fn open_vscode_project(name: &str) -> () {
    println!("running CLI command");
    let command = Command::new("cmd")
        .arg("/C")
        .arg("code")
        .arg("-n")
        .arg(name)
        .output()
        .expect("CLI command failed");
    println!("{} {:?}", command.status, command.stdout);
}

#[tauri::command]
fn open_blender_project(name: &str) -> () {
    println!("running CLI command");
    let command = Command::new("cmd")
        .arg("/C")
        .arg("blender")
        .arg(name)
        .output()
        .expect("CLI command failed");
    println!("{} {:?}", command.status, command.stdout);
}

#[tauri::command]
fn open_visual_studio_project(name: &str) -> () {
    println!("running CLI command");
    let command = Command::new("cmd")
        .arg("/C")
        .arg("start")
        .arg(name)
        .output()
        .expect("CLI command failed");
    println!("{} {:?}", command.status, command.stdout);
}

#[tauri::command]
fn open_folder(name: &str) -> () {
    println!("running CLI command");
    showfile::show_path_in_file_manager(name);
}

// Opens a new command line window and runs user's command
#[tauri::command]
fn open_command_line(name: &str, path: &str) -> () {
    let output = tauri::async_runtime::block_on(async move {
    Command::new("cmd")
        // Set the command line start path with user's pref
        .current_dir(if path != "" { path } else { "./" } )
        // We spawn a new command line window and pass in commands
        // TODO: Make Mac and Linux compatible versions
        .args(["/C", "start", "cmd.exe", "@cmd", "/k", name])
        .spawn()
        .unwrap()
    });
    // println!("{:?}  {:?}", output.stderr, output.stdout);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            open_vscode_project, 
            open_blender_project, 
            open_visual_studio_project,
            open_folder,
            open_command_line,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
