use std::process::Command;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![open_vscode_project, open_blender_project, open_visual_studio_project])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
